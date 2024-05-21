import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import { useDebounce } from 'use-debounce';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import Container from '@mui/material/Container';

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
    <Stack
      spacing={4}
      justifyContent="center"
      sx={{ width: 1, height: '100vh' }}
    >
      <Input
        onChange={(e) => handleInput(e.target.value)}
        placeholder="valid IPv4/IPv6 address"
        type="search"
      />

      <Stack direction="row" spacing={8}>
        <Stack justifyContent="center" alignItems="center">
          {locationState.loading ? (
            <CircularProgress color="info" />
          ) : (
            <div>
              {locationState.status === 'success' && (
                <CheckIcon color="success" sx={{ fontSize: 40 }} />
              )}
              {(locationState.status === 'error' ||
                locationState.status === 'fail') && (
                <ErrorIcon color="error" sx={{ fontSize: 40 }} />
              )}
              {locationState.status === 'ready' && (
                <InfoIcon color="warning" sx={{ fontSize: 40 }} />
              )}
            </div>
          )}
        </Stack>

        <Stack justifyContent="center" alignItems="center">
          {locationState.status === 'ready' && (
            <div>
              <p>
                <strong>dmh-ipapi</strong> is a (very) simple service that maps
                a given IPv4/IPv6 address to a country & city
              </p>
              <p>
                It is running its own backend, but utilizes the
                <strong> ip-api.com </strong> IP Geolocation API to fulfill your
                requests
              </p>
              <p>
                Please note that any input will be automatically processed (with
                a small debounce) and there is some basic error handling that
                will differentiate between errors on behalf of the
                <strong> dmh-ipapi-backend</strong>, the external IP Geolocation
                API service
              </p>
              <p>
                It will also differentiate between user-errors (e.g. invalid
                IPv4/IPv6 address that the backend won't forward to the IP
                Gelocation API service) and external factors (hint: give
                <strong> 127.0.0.1</strong> a try!)
              </p>
            </div>
          )}
          {locationState.status === 'success' && (
            <div>
              <p>
                <strong>City:</strong> {locationState.city}
              </p>
              <p>
                <strong>Country:</strong> {locationState.country}
              </p>
              <p>
                <strong>IP:</strong> {locationState.ipAddress}
              </p>
            </div>
          )}
          {(locationState.status === 'error' ||
            locationState.status === 'fail') && (
            <div>
              <p>
                Oh no! The
                <strong>
                  {locationState.status === 'fail'
                    ? ' external IP Gelocation API '
                    : ' dmh-ipapi-backend '}
                </strong>
                has not been able to process your request!
              </p>
              <p>
                <strong>Reason:</strong> {locationState.message}
              </p>
            </div>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
