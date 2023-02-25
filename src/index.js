import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppProvider";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import ProtectedRoute from "./components/ProtectedRoute";
import App from "./components/App";
import Map from "./components/Map";

const options = {
  timeout: 5000,
  positions: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <AppProvider>
          <AlertProvider template={AlertTemplate} {...options}>
            <Routes>
              <Route path="/" element={<App />} />
              <Route
                path="/map"
                element={
                  <ProtectedRoute>
                    <Map />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AlertProvider>
        </AppProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
