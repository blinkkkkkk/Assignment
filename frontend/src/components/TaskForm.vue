<template>
    <div>
        <form @submit.prevent="addNewTask">
            <input v-model="taskForm.name" placeholder="Task Name" required class="task-input" />
            <input v-model="taskForm.description" placeholder="Task Description" required class="task-input" />
            <button type="submit">Add Task</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()

const taskForm = ref({
    name: '',
    description: '',
})

const addNewTask = async () => {
    if (taskForm.value.name && taskForm.value.description) {
        await taskStore.addTask(taskForm.value)
        taskForm.value.name = ''
        taskForm.value.description = ''
    }
}
</script>

<style scoped>
.task-input {
    margin: 10px;
    padding: 10px;
    width: 200px;
}

button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
}
</style>