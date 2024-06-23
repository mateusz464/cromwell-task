import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./sections/Register.tsx";
import Login from "./sections/Login.tsx";
import NavigationPage from "./pages/NavigationPage.tsx";
import Home from "./sections/Home.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <NavigationPage>
                  <Home />
                </NavigationPage>
              }
            />
            <Route
              path="/register"
              element={
                <NavigationPage>
                  <Register />
                </NavigationPage>
              }
            />
            <Route
              path="/login"
              element={
                <NavigationPage>
                  <Login />
                </NavigationPage>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
