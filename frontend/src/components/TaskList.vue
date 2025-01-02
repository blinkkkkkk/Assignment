<template>
    <button @click="showAddTaskForm" class="add-task-btn">+</button>
    <div class="task-list">
        <div v-for="task in taskStore.tasks" :key="task.id" class="task-item">
            <TaskItem :task="task" />
        </div>
    </div>
    <TaskForm v-if="showForm" @submit="submitTask" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import TaskItem from './TaskItem.vue'
import TaskForm from './TaskForm.vue'

const taskStore = useTaskStore()
const showForm = ref(false)

const showAddTaskForm = () => {
    showForm.value = true
}

const submitTask = async (taskData: { name: string, description: string }) => {
    await taskStore.addTask(taskData)
    showForm.value = false
}
</script>

<style scoped>
.task-list {
    width: 100%;
    max-width: 600px;
    margin-top: 20px;
    position: relative;
}

.task-item {
    background-color: #fff;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.add-task-btn {
    position: fixed;
    bottom: 30px;
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
}

.add-task-btn:hover {
    background-color: #1ba222;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}
</style>