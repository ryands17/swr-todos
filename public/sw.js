/* eslint no-undef: 0 */

const bgSyncPlugin = new workbox.backgroundSync.Plugin('todos', {
  maxRetentionTime: 24 * 60,
})

workbox.routing.registerRoute(
  'http://localhost:3001/todos',
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
)

workbox.routing.registerRoute(
  new RegExp('http://localhost:3001/todos/+', 'i'),
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'PATCH'
)

workbox.routing.registerRoute(
  new RegExp('http://localhost:3001/todos/+', 'i'),
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'DELETE'
)
