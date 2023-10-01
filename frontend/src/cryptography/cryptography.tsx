import Encryption from './encryption/Encryption';
import Decryption from './decryption/Decryption';
import { useState } from 'react';
import CryptographySwitch from './switch/CryptographySwitch';

enum CryptographyMode {
  encryption,
  decryption,
}

const Cryptography = () => {
  const [mode, setMode] = useState<CryptographyMode>(CryptographyMode.encryption);

  return (
    <div>
      <CryptographySwitch
        value={mode === CryptographyMode.encryption}
        onChange={() =>
          setMode(mode === CryptographyMode.encryption ? CryptographyMode.decryption : CryptographyMode.encryption)
        }
      />
      {mode === CryptographyMode.encryption ? <Encryption /> : <Decryption />}
    </div>
  );
};

export default Cryptography;
