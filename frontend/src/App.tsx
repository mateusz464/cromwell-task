import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.ts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import Register from "./sections/Register.tsx";
import Login from "./sections/Login.tsx";
import NavigationPage from "./pages/NavigationPage.tsx";
import Home from "./sections/Home.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.ts";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <NavigationPage>
                      <h1>Profile</h1>
                    </NavigationPage>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
