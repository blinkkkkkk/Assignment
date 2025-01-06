<template>
    <div>
        <div class="view-toggle-buttons">
            <button @click="toggleView" class="toggle-btn">Switch to {{ isTableView ? 'Card' : 'Table' }} View</button>
        </div>
        <TaskTable v-if="isTableView" />
        <TaskCard v-else />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TaskTable from './TaskTable.vue'
import TaskCard from './TaskCard.vue'

const isTableView = ref(false)

// Function to toggle between card and table view
const toggleView = () => {
    isTableView.value = !isTableView.value
}
</script>

<style scoped>
.view-toggle-buttons {
    margin: 20px 0;
}

.toggle-btn {
    padding: 10px 20px;
    background-color: #2ecc71;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.toggle-btn:hover {
    background-color: #27ae60;
}
</style>