import instance from '../request' // Ensure your axios instance is imported correctly

export const task = {

  healthCheck: () => {
    return instance({
      url: '/api/health-check', // Endpoint to get tasks
      method: 'get',
    })
  }
}
