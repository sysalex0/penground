import LockIcon from '@mui/icons-material/Lock';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Alert,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  SnackbarOrigin,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { CryptographyAlgorithm, DecryptionRequest } from '../../../openapi/generated';
import Api from '../../../openapi';
import { CryptographyModuleProps } from '../common/component-props';
import { AxiosError } from 'axios';

interface SnackbarState extends SnackbarOrigin {
  open: boolean;
}

const Decryption = ({ disableAlgorithms }: CryptographyModuleProps) => {
  const [messageToDecrypt, setMessageToDecrypt] = useState('');
  const [algorithm, setAlgorithm] = useState<CryptographyAlgorithm | ''>('');
  const [decryptedMessage, setDecryptedMessage] = useState('');

  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [errorMessage, setErrorMessage] = useState('');
  const [errorSnackbarState, setErrorSnackbarState] = React.useState<SnackbarState>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const updateLoadingState = (id: string, isLoading: boolean) => {
    setLoadingStates((prevState) => ({
      ...prevState,
      [id]: isLoading,
    }));
  };

  const isValidateInput = () => {
    return messageToDecrypt !== '' && algorithm !== '';
  };

  const handleDecryptButtonOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonId = e.currentTarget.id;
    updateLoadingState(buttonId, true);

    if (!isValidateInput()) {
      setErrorMessage('Please enter all required input!');
      handleErrorBarClick({ vertical: 'top', horizontal: 'center' });
      return;
    }

    const requestBody: DecryptionRequest = {
      payload: messageToDecrypt,
      algorithm: algorithm as CryptographyAlgorithm,
    };

    try {
      const response = await Api.Cryptography.cryptographyDecryptPost(requestBody);
      setDecryptedMessage(response.data.payload);
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Server Error!');
      }
      setErrorSnackbarState({ ...errorSnackbarState, open: true });
    } finally {
      updateLoadingState(buttonId, false);
    }
  };

  const handleErrorBarClick = (newState: SnackbarOrigin) => {
    setErrorSnackbarState({ ...newState, open: true });
  };

  const handleErrorBarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorSnackbarState({ ...errorSnackbarState, open: false });
  };

  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        autoFocus
        label="Message to Decrypt"
        id="message-to-decrypt"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMessageToDecrypt(event.target.value);
        }}
      />
      <FormControl fullWidth>
        <InputLabel id="algorithm-select-label">Algorithm *</InputLabel>
        <Select
          labelId="algorithm-select-label"
          id="algorithm-select"
          label="Algorithm *"
          defaultValue={algorithm}
          value={algorithm}
          onChange={(event: SelectChangeEvent) => {
            setAlgorithm(event.target.value as CryptographyAlgorithm);
          }}
        >
          {Object.entries(CryptographyAlgorithm).map(([key, value]) => (
            <MenuItem key={key} value={value} disabled={disableAlgorithms.includes(value)}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Stack padding={4} spacing={2} direction="row" justifyContent="center">
        <LoadingButton
          id="decrypt-button"
          onClick={handleDecryptButtonOnClick}
          variant="contained"
          color="primary"
          loading={loadingStates['decrypt-button']}
          loadingPosition="start"
          startIcon={<LockIcon />}
        >
          <span>Decrypt</span>
        </LoadingButton>
      </Stack>
      {decryptedMessage !== '' && (
        <Card>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Decrypted result:
          </Typography>
          <CardContent>
            <Typography>{decryptedMessage}</Typography>
          </CardContent>
        </Card>
      )}
      <Snackbar
        id="error-snackbar"
        anchorOrigin={{ vertical: errorSnackbarState.vertical, horizontal: errorSnackbarState.horizontal }}
        open={errorSnackbarState.open}
        autoHideDuration={6000}
        onClose={handleErrorBarClose}
        key={errorSnackbarState.vertical + errorSnackbarState.horizontal}
      >
        <Alert onClose={handleErrorBarClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Decryption;
