import React from "react";
import { AuthProvider } from "./context/AuthContext";
import AppNavigator from "./AppNavigator";
import { SearchContextProvider } from "./context/SearchContext";

const App = () => {
  return (
    <AuthProvider>
      <SearchContextProvider>
        <AppNavigator />
      </SearchContextProvider>
    </AuthProvider>
  );
};

export default App;
