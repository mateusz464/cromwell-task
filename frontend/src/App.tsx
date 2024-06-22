import "./App.css";
import Register from "./sections/Register.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <div className="App">
          <Register />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
