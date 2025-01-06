import instance from '../request'

export const task = {

  healthCheck: () => {
    return instance({
      url: '/health-check',
      method: 'get',
    })
  },
  addTask: (task: { name: string; description: string }) => {
    return instance({
      url: '/tasks/addTask',
      method: 'post',
      data: task,
    })
  },
  getCurrentTasks: () => {
    return instance({
      url: '/tasks', //
      method: 'get',
    })
  },
  updateTask: (task: { taskId: string, status: string }) => {
    return instance({
      url: `/tasks/${task.taskId}`,
      method: 'patch',
      data: { status: task.status },
    })
  },
  deleteTask: (taskId: string) => {
    return instance({
      url: `/tasks/${taskId}`,
      method: 'delete',
    })
  }
}
