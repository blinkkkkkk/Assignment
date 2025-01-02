import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api'
import type { Task } from '@/types/types'

export const useTaskStore = defineStore('task', () => {
    const tasks = ref<Task[]>([])

    const getTasks = async () => {
        try {
            const response = await api.task.getCurrentTasks()
            tasks.value = response
        } catch (error) {
            console.error('Failed to fetch tasks:', error)
        }
    }

    // Add a new task
    const addTask = async (task: { name: string; description: string }) => {
        try {
            const newTask = await api.task.addTask(task)
            tasks.value.push(newTask)  // Dynamically update the state
        } catch (error) {
            console.error('Failed to add task:', error)
        }
    }

    // Update a task's status
    const updateTask = async (taskId: string, status: string) => {
        try {
            await api.task.updateTask({ taskId, status })
            const index = tasks.value.findIndex(task => task.id === taskId)
            if (index !== -1) {
                tasks.value[index].status = status  // Update the task in state
            }
        } catch (error) {
            console.error('Failed to update task:', error)
        }
    }

    // Delete a task
    const deleteTask = async (taskId: string) => {
        try {
            await api.task.deleteTask(taskId)
            tasks.value = tasks.value.filter(task => task.id !== taskId)  // Remove the task from state
        } catch (error) {
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