<template>
    <div>
        <button @click="showAddTaskForm" class="add-task-btn">+</button>
        <div class="task-list">
            <div v-for="task in paginatedTasks" :key="task.id" class="task-card">
                <TaskItem :task="task" />
                <div class="task-actions">
                    <el-select v-model="task.status" @change="updateStatus(task)" class="status-select" size="small">
                        <el-option label="Pending" value="pending"></el-option>
                        <el-option label="Completed" value="completed"></el-option>
                    </el-select>
                    <button @click="deleteTask(task.id)" class="btn-delete">Delete</button>
                </div>
            </div>
        </div>
        <div class="pagination-container">
            <el-pagination v-if="totalTasks > 0" :current-page="currentPage" :page-size="pageSize" :total="totalTasks"
                @current-change="handlePageChange" layout="prev, pager, next" background />
        </div>
    </div>

    <TaskForm v-if="showForm" @submit="submitTask" @close="closeForm" />
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import TaskItem from './TaskItem.vue'
import { ElMessage } from 'element-plus'

const taskStore = useTaskStore()

const currentPage = ref(1)
const pageSize = ref(3)
const totalTasks = ref(0)

import type { Task } from '@/types/types'
const paginatedTasks = ref<Task[]>([])

const showForm = ref(false)

const showAddTaskForm = () => {
    showForm.value = true
}

const closeForm = () => {
    showForm.value = false
}

const submitTask = () => {
    console.log("submitTask")
}

const updateStatus = async (task: any) => {
    try {
        await taskStore.updateTask(task.id, task.status)
        ElMessage.success('Task status updated!')
    } catch (error) {
        ElMessage.error('Failed to update task status')
        console.error('Error updating task status:', error)
    }
}

const deleteTask = async (taskId: string) => {
    try {
        await taskStore.deleteTask(taskId)
        updatePaginatedTasks()
        ElMessage.success('Task deleted successfully!')
    } catch (error) {
        ElMessage.error('Failed to delete task')
        console.error('Error deleting task:', error)
    }
}

const handlePageChange = (page: number) => {
    currentPage.value = page
    updatePaginatedTasks()
}

const updatePaginatedTasks = () => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    const tasks = taskStore.tasks
    totalTasks.value = tasks.length
    paginatedTasks.value = tasks.slice(start, end)
}

watchEffect(() => {
    updatePaginatedTasks()
})
</script>

<style scoped>
.task-table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

.pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.add-task-btn {
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 60px;
    height: 60px;
    background-color: #2ec333;
    color: white;
    border-radius: 50%;
    border: none;
    font-size: 32px;
    text-align: center;
    line-height: 60px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    z-index: 1000;
}

.add-task-btn:hover {
    background-color: #1ba222;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.task-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-evenly;
}

.task-card {
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    width: 280px;
    padding: 20px;
    transition: transform 0.2s ease;
}

.task-card:hover {
    transform: scale(1.05);
}

.task-actions {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
}

.status-select {
    width: 120px;
}

.btn-delete {
    padding: 8px 16px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn-delete:hover {
    background-color: #e53935;
}
</style>
