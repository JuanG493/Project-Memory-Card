import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Game from './game';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Game></Game>
  </StrictMode>,
)
