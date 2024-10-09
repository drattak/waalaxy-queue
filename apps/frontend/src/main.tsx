import { Container, MantineProvider, Stack, Title } from '@mantine/core';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ActionSelector } from './components/action-selector';
import { ActionDisplay } from './components/action-display';
import { ActionQueue } from './components/action-queue';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { Notifications } from '@mantine/notifications';


const root = ReactDOM.createRoot(
  document.getElementById('root') ?? document.body
);

root.render(
  <StrictMode>
    <MantineProvider>
      <Notifications />
      <Container>
        <Stack>
          <Title>Gestionnaire de Queue d'Actions</Title>

          <ActionDisplay />

          <ActionSelector />

          <ActionQueue />
        </Stack>
      </Container>
    </MantineProvider>
  </StrictMode>
);
