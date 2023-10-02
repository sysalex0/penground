import Encryption from './encryption/Encryption';
import Decryption from './decryption/Decryption';
import { useState } from 'react';
import CryptographySwitch from './switch/CryptographySwitch';
import { CryptographyAlgorithm } from '../openapi/generated';
import { Box } from '@mui/material';

enum CryptographyMode {
  encryption,
  decryption,
}

const DISABLED_ALGORITHMS: CryptographyAlgorithm[] = [CryptographyAlgorithm.Sys];

const Cryptography = () => {
  const [mode, setMode] = useState<CryptographyMode>(CryptographyMode.encryption);

  return (
    <Box sx={{ textAlign: 'center' }}>
      <CryptographySwitch
        sx={{
          marginTop: 32,
        }}
        value={mode === CryptographyMode.encryption}
        onChange={() =>
          setMode(mode === CryptographyMode.encryption ? CryptographyMode.decryption : CryptographyMode.encryption)
        }
      />
      {mode === CryptographyMode.encryption ? (
        <Encryption disableAlgorithms={DISABLED_ALGORITHMS} />
      ) : (
        <Decryption disableAlgorithms={DISABLED_ALGORITHMS} />
      )}
    </Box>
  );
};

export default Cryptography;
