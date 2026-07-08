import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { AppContextProvider } from './contexts/AppContext/AppContext.tsx';
import { AuthenticationContextProvider } from './contexts/AuthentificationContext/AuthentificationContext.tsx';
import './index.css';

Modal.setAppElement('#root');

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppContextProvider>
        <AuthenticationContextProvider>
          <App />
        </AuthenticationContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
