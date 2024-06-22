import "./App.css";
import Register from "./sections/Register.tsx";
import { createTheme, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Register />
      </div>
    </ThemeProvider>
  );
}

export default App;
