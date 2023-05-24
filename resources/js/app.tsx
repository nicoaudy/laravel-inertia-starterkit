import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import { MantineProvider, createEmotionCache } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

const mantineCache = createEmotionCache({
  key: 'mantine',
  prepend: false,
});

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
      <MantineProvider withGlobalStyles withNormalizeCSS emotionCache={mantineCache}>
        <ModalsProvider>
          <App {...props} />
        </ModalsProvider>
      </MantineProvider>
    );
  },
});