import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import { useDebounce } from 'use-debounce';
import { Container } from '@mui/material';

interface Location {
  city?: string;
  country?: string;
  ipAddress?: string;
  status: string;
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
        setLocation({ status: 'error' });
      }
    };

    fetchData();
  }, [debounceInput]);

  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Input
          placeholder="IPv4/IPv6"
          value={inputValue}
          onChange={(e) => handleInput(e.target.value)}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <div>{location ? JSON.stringify(location) : ''}</div>
        )}
      </Stack>
    </Box>
  );
}
