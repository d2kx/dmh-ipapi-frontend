import React, { useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

function CountryText() {
  const { filled } = useFormControl() || {};

  const country = useMemo(() => {
    if (filled) {
      async () => {
        await sleep(1e3);
        console.log('test');
      };

      return 'DE';
    }

    return 'USA';
  }, [filled]);

  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {country}
    </Typography>
  );
}

export default function LocationInput() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl>
        <Input placeholder="hi" />
        <CountryText />
      </FormControl>
    </Box>
  );
}
