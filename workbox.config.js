module.exports = options => {
  return {
    ...options,
    skipWaiting: true,
    runtimeCaching: [
      {
        handler: 'StaleWhileRevalidate',
        urlPattern: 'http://localhost:3001/todos',
        method: 'GET',
      },
    ],
  }
}
