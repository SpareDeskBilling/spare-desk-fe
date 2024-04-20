import { Provider } from "react-redux";
import store from "store/store";
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { RouteLayout } from './routes';

import 'styles/reset.css';
import "styles/global.css";
import { CUSTOM_THEME } from "themes/muiTheme";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Router>
      <ThemeProvider theme={CUSTOM_THEME}>
        <RouteLayout />
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
