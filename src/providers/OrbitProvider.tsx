import { useEffect, useState, useContext, useRef } from 'react';

import useSetupOrbit from '../components/util/useSetupOrbit';
import orbitContext from '../context/orbitContext';
import { useIpfs } from '../providers/IpfsProvider';

export const OrbitProvider = ({ children }: any) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { ipfs, ipfsLoaded } = useIpfs();
  const [orbit] = useSetupOrbit(ipfs);
  const orbitLoaded = useRef(false);
  const [value1, setValue1] = useState<any>({ orbit, orbitLoaded });

  useEffect(() => {
    if (orbit) {
      orbitLoaded.current = true;
      setValue1({ orbit, orbitLoaded });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orbit]);
  return (
    <orbitContext.Provider value={value1}>{children}</orbitContext.Provider>
  );
};

export const useOrbit = () => {
  const context = useContext(orbitContext);
  if (context === undefined) {
    throw new Error('useOrbit must be used within a OrbitProvider');
  }
  return context;
};
