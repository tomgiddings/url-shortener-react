import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from 'react';


function App() {
  const [entryUrl, setEntryUrl] = useState('');
  const [responseUrl, setResponseUrl] = useState('');

  const handleSubmit = async () => {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: entryUrl })
    };
    const response = await fetch('http://localhost:3001/url', options);
    const data = await response.json();
    console.log(await data)
    setResponseUrl(window.location.href + data.key)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h3">Shorten URL</Typography>
          <FormControl
            fullWidth
          >
            <TextField
              id="standard-basic"
              label="Enter url to shorten"
              onChange={(e) => setEntryUrl(e.target.value)}
            />
            <Button onClick={handleSubmit}>Shorten</Button>
          </FormControl>
          {responseUrl.length > 0 &&
            <Box>
              <Typography component="h2" variant="h5">Result:</Typography>
              <Typography>{responseUrl}</Typography>
            </Box>
          }
        </Box>
    </Container>
  );
}

export default App;
