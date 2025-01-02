<template>
    <div class="task-item">
        <div>
            <strong>{{ task.name }}</strong>
            <p>{{ task.description }}</p>
            <p><em>{{ task.catFact }}</em></p>
            <p>Status: {{ task.status }}</p>
        </div>
        <button @click="markCompleted" v-if="task.status !== 'completed'">
            Mark as Completed
        </button>
        <button @click="deleteTask">Delete Task</button>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

// Define the task prop
const props = defineProps({
    task: {
        type: Object,
        required: true,
    },
})

const taskStore = useTaskStore()

const markCompleted = async () => {
    await taskStore.updateTask(props.task.id, 'completed')
}

const deleteTask = async () => {
    await taskStore.deleteTask(props.task.id)
}
</script>

<style scoped>
.task-item {
    padding: 15px;
    border: 1px solid #ddd;
    margin-bottom: 10px;
}

button {
    margin-right: 10px;
    padding: 5px 10px;
    background-color: #ff4d4f;
    color: white;
    border: none;
    cursor: pointer;
}
</style>