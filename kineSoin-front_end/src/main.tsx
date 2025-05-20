import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { AuthentificationGlobalContextProvider } from './utils/contexts/authentificationContexts/AuthentificationGlobalContext.tsx';
import { GlobalContextProvider } from './utils/contexts/GlobalContext.tsx';

Modal.setAppElement('#root');

const queryClient = new QueryClient();

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalContextProvider>
          <AuthentificationGlobalContextProvider>
            <App />
          </AuthentificationGlobalContextProvider>
        </GlobalContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

createRoot(document.getElementById('root')!).render(<Root />);
