import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api'
import { ElNotification } from 'element-plus'
import type { Task } from '@/types/types'

export const useTaskStore = defineStore('task', () => {
    const tasks = ref<Task[]>([])

    const getTasks = async () => {
        try {
            const response = await api.task.getCurrentTasks()
            tasks.value = response
        } catch (error: any) {
            ElNotification({
                message: error.response?.data?.message || 'No tasks found',
                type: 'Info',
            })
            console.error('Failed to fetch tasks:', error)
        }
    }

    const addTask = async (task: { name: string; description: string }) => {
        try {
            const newTask = await api.task.addTask(task)
            tasks.value.push(newTask)
            ElNotification({
                title: 'Success',
                message: 'Task added successfully',
                type: 'success',
            })
        } catch (error: any) {
            ElNotification({
                title: 'Error',
                message: error.response?.data?.message || 'Failed to add task',
                type: 'error',
            })
            console.error('Failed to add task:', error)
        }
    }

    // Update a task's status
    const updateTask = async (taskId: string, status: string) => {
        try {
            await api.task.updateTask({ taskId, status })
            const index = tasks.value.findIndex(task => task.id === taskId)
            if (index !== -1) {
                tasks.value[index].status = status
            }
            ElNotification({
                title: 'Success',
                message: 'Task status updated successfully',
                type: 'success',
            })
        } catch (error: any) {
            ElNotification({
                title: 'Error',
                message: error.response?.data?.message || 'Failed to update task status',
                type: 'error',
            })
            console.error('Failed to update task:', error)
        }
    }

    // Delete a task
    const deleteTask = async (taskId: string) => {
        try {
            await api.task.deleteTask(taskId)
            tasks.value = tasks.value.filter(task => task.id !== taskId)
        } catch (error: any) {
            ElNotification({
                title: 'Error',
                message: error.response?.data?.message || 'Failed to delete task',
                type: 'error',
            })
            console.error('Failed to delete task:', error)
        }
    }

    return {
        tasks,
        getTasks,
        addTask,
        updateTask,
        deleteTask,
    }
})