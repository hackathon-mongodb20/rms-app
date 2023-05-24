import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import AppMain from './AppMain';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const TITLE = 'RMS Demo';

const darkTheme = createTheme({
  palette: {
	background: { default:'#785c9c' },
    mode: 'dark'
  },
});

function App() {

	return (
		<ThemeProvider theme={darkTheme}>
      		<CssBaseline />
			<Helmet>
				<title>{TITLE}</title>
			</Helmet>
			<AppMain/>
		</ThemeProvider>
	);
}

export default App;
