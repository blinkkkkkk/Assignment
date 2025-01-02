<template>
    <div class="task-item">
        <div class="task-info">
            <strong class="task-name">{{ task.name }}</strong>
            <p class="task-description">{{ task.description }}</p>
            <p class="task-catFact"><em>{{ task.catFact }}</em></p>
            <p class="task-status">Status: <span :class="task.status">{{ task.status }}</span></p>
            <p class="task-cDate">Create At:{{ task.createAt }}</p>
        </div>
        <div :class="['action-buttons', buttonClass]">
            <button v-if="task.status !== 'completed'" @click="markCompleted" class="btn-completed">
                Mark as Completed
            </button>
            <button @click="deleteTask" class="btn-delete">
                Delete Task
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed, watch } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

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
    // await taskStore.deleteTask(props.task.id)
    const removedTask = { ...props.task }
    taskStore.deleteTask(props.task.id, true)
    try {
        await taskStore.deleteTask(props.task.id)
    } catch (error) {
        taskStore.addTask(removedTask)
        console.error('Failed to delete task:', error)
    }
}

const buttonClass = computed(() => {
    if (props.task.status !== 'completed') {
        return 'left-right-buttons'
    } else {
        return 'center-button'
    }
})

watch(
    () => props.task.status,
    (newStatus) => {
        if (newStatus === 'completed') {
            buttonClass.value = 'center-button'
        } else {
            buttonClass.value = 'left-right-buttons'
        }
    }
)
</script>

<style scoped>
.task-item {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    transition: transform 0.2s ease;
}

.task-item:hover {
    transform: scale(1.03);
}

.task-info {
    margin-bottom: 15px;
}

.task-name {
    font-size: 1.5rem;
    color: #333;
    font-weight: bold;
}

.task-description {
    font-size: 1rem;
    color: #555;
}

.task-catFact {
    font-size: 0.9rem;
    color: #888;
}

.task-status {
    font-size: 1rem;
    color: #666;
}

.task-cDate {
    font-size: 1rem;
    color: #777;
}

.task-status span {
    font-weight: bold;
}

.task-status .completed {
    color: green;
}

.task-status .pending {
    color: orange;
}

.action-buttons {
    display: flex;
    gap: 5px;
    justify-content: center;
}

.center-button {
    justify-content: center;
}

.left-right-buttons {
    justify-content: space-between;
}

button {
    padding: 8px 16px;
    font-size: 1rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-completed {
    background-color: #4CAF50;
    color: white;
}

.btn-completed:hover {
    background-color: #45a049;
}

.btn-delete {
    background-color: #f44336;
    color: white;
}

.btn-delete:hover {
    background-color: #e53935;
}
</style>