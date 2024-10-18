import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import App from './App.tsx';
import './index.css';

Modal.setAppElement('#root');

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(<Root />);
