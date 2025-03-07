import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import App from './App.tsx';
import './index.css';
import { AuthentificationGlobalContextProvider } from './utils/contexts/authentificationContexts/AuthentificationGlobalContext.tsx';
import { GlobalContextProvider } from './utils/contexts/GlobalContext.tsx';

Modal.setAppElement('#root');

export default function Root() {
  return (
    <BrowserRouter>
      <GlobalContextProvider>
        <AuthentificationGlobalContextProvider>
          <App />
        </AuthentificationGlobalContextProvider>
      </GlobalContextProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(<Root />);
