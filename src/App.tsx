import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CallToAction from './CallToAction';
import LocationInput from './LocationInput';
import { useDebounce } from 'use-debounce';

export default function App() {
  const [ipAddressValue, setIpAddressValue] = useState<string>('');
  const [locationResult, setLocationResult] = useState('');

  const [debounceInput] = useDebounce(ipAddressValue, 1000);

  const URL = 'http://localhost:3100/api/location/';

  useEffect(() => {
    const fetchData = async () => {
      if (debounceInput.trim() === '') {
        setLocationResult('');
        return;
      }
      try {
        const response = await fetch(URL + debounceInput);
        const data = await response.json();
        setLocationResult(data);
      } catch (error) {}
    };

    fetchData();
  }, [debounceInput]);

  return (
    <div>
      <input
        value={ipAddressValue}
        type="search"
        onChange={(e) => setIpAddressValue(e.target.value)}
      />
      <div>{locationResult ? JSON.stringify(locationResult) : ''}</div>
    </div>
  );

  /* return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          dmh-ipapi-frontend
        </Typography>
        <LocationInput />
        <CallToAction />
      </Box>
    </Container>
  ;*/
}
