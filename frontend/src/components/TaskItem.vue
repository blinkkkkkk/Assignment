<template>
    <div class="task-item">
        <div class="task-info">
            <strong class="task-name">{{ task.name }}</strong>
            <p class="task-description">{{ task.description }}</p>
            <p class="task-catFact"><em>{{ task.catFact }}</em></p>
            <p class="task-status">Status: <span :class="task.status">{{ task.status }}</span></p>
            <p class="task-cDate">Create At: {{ task.createAt }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
    task: {
        type: Object,
        required: true,
    },
})
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
</style>