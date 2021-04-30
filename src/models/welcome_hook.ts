import { useState, useCallback } from 'react';

export default function welcome_hook(): any {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [token, setToken] = useState('test');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const setTokenVal = useCallback(() => {
    setTimeout(() => {
      setToken('123456');
    }, 1000);
  }, []);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const resetTokenVal = useCallback(() => {
    setToken('test');
  }, []);

  return { token, setTokenVal, resetTokenVal };
}
