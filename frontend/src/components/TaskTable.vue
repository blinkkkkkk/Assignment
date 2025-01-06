<template>
    <div>
        <button @click="showAddTaskForm" class="add-task-btn">+</button>
        <div class="task-table-container">
            <el-table :data="paginatedTasks" style="width: 100%">
                <el-table-column prop="name" label="Task Name" :min-width="100"></el-table-column>
                <el-table-column prop="description" label="Task Description" :min-width="150"></el-table-column>
                <el-table-column prop="catFact" label="Cat Fact" :min-width="300"></el-table-column>
                <el-table-column prop="status" label="Status" :min-width="150">
                    <template #default="{ row }">
                        <el-select v-model="row.status" @change="updateStatus(row)" class="status-select" size="small">
                            <el-option label="Pending" value="pending"></el-option>
                            <el-option label="Completed" value="completed"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="createAt" label="Created At" :min-width="200"></el-table-column>
                <el-table-column>
                    <template #default="{ row }">
                        <button @click="deleteTask(row.id)" class="btn-delete">Delete</button>
                    </template>
                </el-table-column>
            </el-table>
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
import { ElMessage } from 'element-plus'
import TaskForm from './TaskForm.vue'

const taskStore = useTaskStore()

const currentPage = ref(1)
const pageSize = ref(3)
const totalTasks = ref(0)
const paginatedTasks = ref([])

const showForm = ref(false)

const showAddTaskForm = () => {
    showForm.value = true
}

const closeForm = () => {
    showForm.value = false
}

const updateStatus = async (task) => {
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

.status-select {
    width: 100px;
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