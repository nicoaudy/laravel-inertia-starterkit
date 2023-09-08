import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import { ThemeProvider } from '@/components/theme-provider';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
  progress: {
    color: '#4B5563',
  },
  title: (title: string) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <ThemeProvider defaultTheme='light' storageKey='theme'>
        <App {...props} />
      </ThemeProvider>
    );
  },
});
