import LockIcon from '@mui/icons-material/Lock';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Snackbar,
  SnackbarOrigin,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';

interface SnackbarState extends SnackbarOrigin {
  open: boolean;
}

const Decryption = () => {
  const [messageToDecrypt, setMessageToDecrypt] = useState('');
  const [algorithm, setAlgorithm] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');

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

  const isValidateInput = () => {
    return messageToDecrypt !== '' && algorithm !== '';
  };

  const handleDecryptButtonOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonId = e.currentTarget.id;
    updateLoadingState(buttonId, true);

    if (!isValidateInput()) {
      handleErrorBarClick({ vertical: 'top', horizontal: 'center' });
      return;
    }

    const data = {
      messageToDecrypt: messageToDecrypt,
      algorithm: algorithm,
    };

    // call api
    console.log(data);

    setDecryptedMessage('decrypted');
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
        label="Message to Decrypt"
        id="message-to-decrypt"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMessageToDecrypt(event.target.value as string);
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
      <Paper elevation={3}>
        <span>{decryptedMessage}</span>
      </Paper>

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

export default Decryption;
