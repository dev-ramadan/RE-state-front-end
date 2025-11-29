import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.js';
import store from './store.js';
import { Provider } from 'react-redux';

async function enableMocking() {
  const shouldUseMocking = import.meta.env.VITE_USE_MSW === 'true';

  if (!shouldUseMocking) {
    console.log('MSW is disabled.');
    return Promise.resolve();
  }

  console.log('Enabling MSW...');
  const { worker } = await import('./mocks/browser.js');
  return worker.start();
}

enableMocking()
  .then(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </StrictMode>
    );
  })
  .catch((e) => {
    console.error(e);
    console.error('Failed to enable mocking');
  });
