'use client';

import React, { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
}
const ClientOnly: React.FC<Props> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true)
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default ClientOnly;
