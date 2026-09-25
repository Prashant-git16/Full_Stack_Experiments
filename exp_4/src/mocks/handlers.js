import { rest } from 'msw';

// Mocking simulates backend APIs for testing[cite: 2]
export const handlers = [
  rest.get('/api/events', (req, res, ctx) => {
    // Intercepts outgoing HTTP traffic and returns reliable mock JSON data[cite: 2]
    return res(
      ctx.json([{ id: 1, title: 'Mock Event', date: '2026-08-20' }])
    );
  })
];