import { useEffect, useState } from 'react';
import { getRequest } from '../utils/services';

export const useFetchConsnole = () => {
  const [isShowConsole, setIsShowConsole] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getIsShowConsole = async () => {
      const mode_uri = process.env.REACT_APP_CONSOLE_CONFIG_URI;
      const response = await getRequest(mode_uri);
      if (response.error) {
        return setError(error);
      }

      setIsShowConsole(response.ShowConsole);
    };

    getIsShowConsole();
  }, []);

  return { isShowConsole };
};
