import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import { useDebounce } from 'use-debounce';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

interface LocationState {
  city?: string;
  country?: string;
  ipAddress?: string;
  loading: boolean;
  message?: string;
  status: 'error' | 'fail' | 'ready' | 'success';
}

const URL = 'http://localhost:3100/api/location/';

export default function LocationInput() {
  const [inputValue, setInputValue] = useState<string>('');
  const [locationState, setLocationState] = useState<LocationState>({
    loading: false,
    status: 'ready',
  });

  const [debounceInput] = useDebounce(inputValue, 1000);

  const handleInput = (input: string) => {
    setLocationState({
      ...locationState,
      loading: input === debounceInput ? false : true,
    });

    setInputValue(input);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!debounceInput) {
        setLocationState({ loading: false, status: 'ready' });
        return;
      }

      try {
        const response = await fetch(URL + debounceInput);
        const data = await response.json();
        setLocationState({ ...data, loading: false });
      } catch (error) {
        setLocationState({
          loading: false,
          message: 'could not reach dmh-ipapi-backend',
          status: 'error',
        });
      }
    };

    fetchData();
  }, [debounceInput]);

  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Input
          onChange={(e) => handleInput(e.target.value)}
          placeholder="valid IPv4/IPv6 address"
          type="search"
        />
        <Stack direction="row" spacing={2}>
          {locationState.loading ? (
            <CircularProgress color="info" />
          ) : (
            <div>
              {locationState.status === 'success' && (
                <div>
                  <CheckIcon color="success" sx={{ fontSize: 40 }} />
                  <ul>
                    <li>Stadt: {locationState.city}</li>
                    <li>Country: {locationState.country}</li>
                    <li>IP address: {locationState.ipAddress}</li>
                  </ul>
                </div>
              )}
              {locationState.status === 'fail' && (
                <div>
                  <ErrorIcon color="error" sx={{ fontSize: 40 }} />
                  <ul>
                    <li>
                      Oh no! The external IP Geolocation API has not been able
                      to process your request
                    </li>
                    <li>Error: {locationState.message}</li>
                  </ul>
                </div>
              )}
              {locationState.status === 'error' && (
                <div>
                  <ErrorIcon color="error" sx={{ fontSize: 40 }} />
                  <ul>
                    <li>
                      Oh no! The dmh-ipapi-backend has not been able to process
                      your request
                    </li>
                    <li>Error: {locationState.message}</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
