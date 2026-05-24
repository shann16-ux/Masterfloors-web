// Fix for "Cannot set property fetch of #<Window> which has only a getter"
// Some libraries try to polyfill fetch by assigning to window.fetch, 
// which can fail in environments where fetch is a read-only getter.
try {
  const makeFetchWritable = (obj: any) => {
    if (obj && obj.fetch) {
      const descriptor = Object.getOwnPropertyDescriptor(obj, 'fetch');
      if (descriptor && !descriptor.writable && !descriptor.set && descriptor.configurable) {
        Object.defineProperty(obj, 'fetch', {
          value: obj.fetch,
          writable: true,
          configurable: true
        });
      }
    }
  };

  if (typeof window !== 'undefined') {
    makeFetchWritable(window);
    // @ts-ignore
    if (window.Window && window.Window.prototype) {
      // @ts-ignore
      makeFetchWritable(window.Window.prototype);
    }
  }
} catch (e) {
  // Ignore errors if we can't redefine it
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@fontsource/josefin-sans/400.css";
import "@fontsource/josefin-sans/700.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
