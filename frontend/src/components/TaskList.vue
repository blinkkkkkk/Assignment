<template>
    <div>
        <TaskForm />
        <div v-if="taskStore.tasks.length > 0">
            <div v-for="task in taskStore.tasks" :key="task.id">
                <TaskItem :task="task" />
            </div>
        </div>
        <div v-else>No tasks available</div>
    </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import TaskForm from './TaskForm.vue'
import TaskItem from './TaskItem.vue'

const taskStore = useTaskStore()

taskStore.getTasks()
</script>

<style scoped></style>