import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import { useDebounce } from 'use-debounce';

interface Location {
  city?: string;
  country?: string;
  ipAddress?: string;
  message?: string;
  status: 'error' | 'fail' | 'ready' | 'success';
}

const URL = 'http://localhost:3100/api/location/';

export default function LocationInput() {
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [location, setLocation] = useState<Location>({ status: 'ready' });

  const [debounceInput] = useDebounce(inputValue, 1000);

  const handleInput = (input: string) => {
    setLoading(input === debounceInput ? false : true);

    setInputValue(input);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!debounceInput) {
        setLoading(false);
        setLocation({ status: 'ready' });
        return;
      }

      try {
        const response = await fetch(URL + debounceInput);
        const data = await response.json();
        setLoading(false);
        setLocation(data);
      } catch (error) {
        setLoading(false);
        setLocation({
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
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            <div>{location ? JSON.stringify(location) : ''}</div>
            {location.status === 'success' && (
              <ul>
                <li>Stadt: {location.city}</li>
                <li>Country: {location.country}</li>
                <li>IP address: {location.ipAddress}</li>
              </ul>
            )}
            {location.status === 'fail' && (
              <ul>
                <li>
                  Oh no! The external IP Geolocation API has not been able to
                  process your request
                </li>
                <li>Error: {location.message}</li>
              </ul>
            )}
            {location.status === 'error' && (
              <ul>
                <li>
                  Oh no! The dmh-ipapi-backend has not been able to process your
                  request
                </li>
                <li>Error: {location.message}</li>
              </ul>
            )}
          </div>
        )}
      </Stack>
    </Box>
  );
}
