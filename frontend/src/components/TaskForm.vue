<template>
    <div class="task-form-container">
        <div class="task-form">
            <form @submit.prevent="submitTask">
                <input v-model="taskForm.name" placeholder="Task Name" required class="task-input" />
                <textarea v-model="taskForm.description" placeholder="Task Description" required
                    class="task-input"></textarea>
                <button type="submit" class="submit-btn">Add Task</button>
            </form>
        </div>
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

const submitTask = async () => {
    if (taskForm.value.name && taskForm.value.description) {
        await taskStore.addTask(taskForm.value)
        taskForm.value.name = ''
        taskForm.value.description = ''
    }
}

</script>

<style scoped>
.task-form-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease;
    opacity: 1;
}

.task-form-container-enter-active,
.task-form-container-leave-active {
    transition: opacity 0.5s ease;
}

.task-form-container-enter,
.task-form-container-leave-to {
    opacity: 0;
}

.task-form {
    width: 100%;
    max-width: 420px;
    padding: 25px;
    background-color: #2c3e50;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    animation: form-appear 0.5s ease-out;
}

@keyframes form-appear {
    0% {
        transform: scale(0.8);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.task-input {
    width: 100%;
    min-width: 400px;
    padding: 15px;
    margin: 10px 0;
    border: 1px solid #b4c6e0;
    border-radius: 8px;
    box-sizing: border-box;
    font-size: 16px;
    background-color: #ecf0f1;
    transition: border-color 0.3s ease;
}

.task-input:focus {
    border-color: #4CAF50;
    outline: none;
}

.submit-btn {
    padding: 15px 30px;
    background-color: #2ecc71;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    font-size: 18px;
    width: 100%;
    transition: background-color 0.3s ease;
}

.submit-btn:hover {
    background-color: #27ae60;
}

.submit-btn:active {
    transform: scale(0.98);
}
</style>