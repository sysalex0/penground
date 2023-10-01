import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LockIcon from '@mui/icons-material/Lock';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  SnackbarOrigin,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { copyTextToClipboard } from '../../utils/clipboard';

interface SnackbarState extends SnackbarOrigin {
  open: boolean;
}

const Encryption = () => {
  const [messageToEncrypt, setMessageToEncrypt] = useState('');
  const [algorithm, setAlgorithm] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');

  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
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

  const handleEncryptButtonOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonId = e.currentTarget.id;
    updateLoadingState(buttonId, true);

    if (!isValidateEncryptInput()) {
      handleErrorBarClick({ vertical: 'top', horizontal: 'center' });
      return;
    }

    const data = {
      messageToEncrypt: messageToEncrypt,
      algorithm: algorithm,
    };

    // call api
    console.log(data);

    setEncryptedMessage('encrypted');
    updateLoadingState(buttonId, true);
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
          setMessageToEncrypt(event.target.value as string);
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
            setAlgorithm(event.target.value);
          }}
        >
          <MenuItem value="LKH">LKH</MenuItem>
          <MenuItem value="SYS" disabled>
            SYS
          </MenuItem>
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
      <Snackbar
        id="error-snackbar"
        anchorOrigin={{ vertical: errorSnackbarState.vertical, horizontal: errorSnackbarState.horizontal }}
        open={errorSnackbarState.open}
        autoHideDuration={6000}
        onClose={handleErrorBarClose}
        key={errorSnackbarState.vertical + errorSnackbarState.horizontal}
      >
        <Alert onClose={handleErrorBarClose} severity="error">
          Please enter all required input!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Encryption;
