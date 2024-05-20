import React from 'react';
import Container from '@mui/material/Container';
import CallToAction from './CallToAction';
import LocationInput from './LocationInput';

export default function App() {
  return (
    <Container maxWidth="sm">
      <LocationInput />
    </Container>
  );
}
