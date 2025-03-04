// Import necessary React hooks and types
import React, { createContext, useState, ReactNode } from 'react';

// Define the type for our context. This will ensure that
// the context always has 'isLoading' and 'errorMessage' states,
// along with functions to modify them.
interface GlobalAdminContextType {
  isLoading: boolean; // The boolean state that tracks whether the app is loading or not
  setLoading: (loading: boolean) => void; // A function to set the 'isLoading' state
  errorMessage: string | null; // The error message state (can be a string or null)
  setError: (message: string | null) => void; // A function to set the 'errorMessage'
}

// Create the context. This will hold our global state and provide access
// to it throughout the application. Initially, it's undefined because we don't know
// what the value is yet until we wrap the components in the provider.
const GlobalAdminContext = createContext<GlobalAdminContextType | undefined>(
  undefined
);

// Define the type for the GlobalAdminContextProvider props. This is just to type-check the 'children' prop.
interface GlobalAdminContextProviderProps {
  children: ReactNode; // 'children' is the JSX elements that will be wrapped by the provider
}

// Define the actual provider component. This component will be used to wrap parts of our application
// that need access to the global 'isLoading' and 'errorMessage' states.
export const GlobalAdminContextProvider = ({
  children,
}: GlobalAdminContextProviderProps) => {
  // Declare the 'isLoading' state using React's useState hook.
  // The default value is 'false', meaning by default we assume the app is not loading.
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Declare the 'errorMessage' state. The default value is 'null', meaning no error initially.
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // The setLoading function is used to modify the 'isLoading' state.
  const setLoading = (loading: boolean) => setIsLoading(loading);

  // The setErrorMessage function is used to modify the 'errorMessage' state.
  const setError = (message: string | null) => setErrorMessage(message);

  return (
    // Here we wrap our app's children (the components that will use this provider)
    // in the context provider. This allows these components to access the context.
    <GlobalAdminContext.Provider
      value={{ isLoading, setLoading, errorMessage, setError }}
    >
      {children}
    </GlobalAdminContext.Provider>
  );
};

// Custom hook to consume the GlobalAdminContext.
// Instead of using React's useContext directly, we create a custom hook for cleaner code.
export const useGlobalAdminContext = () => {
  // Use React's useContext to consume the context we created.
  const context = React.useContext(GlobalAdminContext);

  // If the context is undefined, it means that this component is not wrapped in the provider.
  // In this case, we throw an error to let the developer know they need to wrap their component in the provider.
  if (!context) {
    throw new Error(
      'useGlobalAdminContext must be used within a GlobalAdminContextProvider'
    );
  }

  // Return the context value, which contains 'isLoading', 'setLoading', 'errorMessage', and 'setErrorMessage'.
  return context;
};

// Export the context itself, so it can be used elsewhere if necessary.
export default GlobalAdminContext;
