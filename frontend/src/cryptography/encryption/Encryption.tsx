import ContentCopyIcon from '@mui/icons-material/ContentCopy';
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
import { copyTextToClipboard } from '../../utils/clipboard';
import Api from '../../openapi';
import { EncryptionRequest, CryptographyAlgorithm, DecryptionRequest } from '../../openapi/generated';
import { CryptographyModuleProps } from '../common/component-props';
import { AxiosError } from 'axios';

interface SnackbarState extends SnackbarOrigin {
  open: boolean;
}

const Encryption = ({ disableAlgorithms }: CryptographyModuleProps) => {
  const [messageToEncrypt, setMessageToEncrypt] = useState('');
  const [algorithm, setAlgorithm] = useState<CryptographyAlgorithm | ''>('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
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

  const isValidateEncryptInput = () => {
    return messageToEncrypt !== '' && algorithm !== '';
  };

  const handleEncryptButtonOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonId = e.currentTarget.id;

    if (!isValidateEncryptInput()) {
      setErrorMessage('Please enter all required input!');
      handleErrorBarClick({ vertical: 'top', horizontal: 'center' });
      return;
    }

    updateLoadingState(buttonId, true);

    const encryptRequestBody: EncryptionRequest = {
      payload: messageToEncrypt,
      algorithm: algorithm as CryptographyAlgorithm,
    };

    try {
      const encryptResponseBody = await Api.Cryptography.cryptographyEncryptPost(encryptRequestBody);
      setEncryptedMessage(encryptResponseBody.data.payload);

      const decryptRequestBody: DecryptionRequest = {
        payload: encryptResponseBody.data.payload,
        algorithm: algorithm as CryptographyAlgorithm,
      };

      const decryptResponseBody = await Api.Cryptography.cryptographyDecryptPost(decryptRequestBody);
      setDecryptedMessage(decryptResponseBody.data.payload);
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
        label="Message to Encrypt"
        name="messageToEncrypt"
        id="messageToEncrypt"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMessageToEncrypt(event.target.value);
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
      <Stack padding={2} spacing={2} direction="row" justifyContent="center">
        <LoadingButton
          id="encrypt-button"
          onClick={handleEncryptButtonOnClick}
          variant="contained"
          color="primary"
          loading={loadingStates['encrypt-button']}
          loadingPosition="start"
          startIcon={<LockIcon />}
        >
          <span>Encrypt</span>
        </LoadingButton>
        <LoadingButton
          id="copy-button"
          onClick={() => {
            copyTextToClipboard(encryptedMessage);
          }}
          variant="contained"
          color="primary"
          loadingPosition="start"
          loading={loadingStates['copy-button']}
          startIcon={<ContentCopyIcon />}
        >
          <span>Copy Result</span>
        </LoadingButton>
      </Stack>
      {decryptedMessage !== '' && (
        <Card>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Decrypt preview:
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

export default Encryption;
