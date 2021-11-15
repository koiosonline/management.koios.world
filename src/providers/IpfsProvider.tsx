import { useEffect, useState, useContext, useRef } from 'react';

import useIpfsSetup from '../components/util/useIpfsSetup';
import ipfsContext from '../context/ipfsContext';
import IPFS_CONFIG from '../components/util/ipfs-config';

export const IpfsProvider = ({ children }) => {
  const [ipfs] = useIpfsSetup(IPFS_CONFIG);
  const ipfsLoaded = useRef(false);
  const [value1, setValue1] = useState<any>({ ipfs, ipfsLoaded });

  useEffect(() => {
    if (ipfs) {
      ipfsLoaded.current = true;
      setValue1({ ipfs, ipfsLoaded });
    }
  }, [ipfs]);
  return <ipfsContext.Provider value={value1}>{children}</ipfsContext.Provider>;
};

export const useIpfs = () => {
  const context = useContext(ipfsContext);
  if (context === undefined) {
    throw new Error('useIpfs must be used within a ipfsProvider');
  }
  return context;
};
