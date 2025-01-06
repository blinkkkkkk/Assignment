<template>
  <div class="home-container">
    <div v-if="taskStore.tasks.length === 0 && !showForm" class="centered">
      <button class="add-task-btn" @click="showForm = true">
        +
      </button>
    </div>

    <transition name="form-transition">
      <div v-if="showForm" class="task-form-container">
        <TaskForm v-if="showForm" @submit="handleFormSubmit" @close="showForm = false" />

      </div>
    </transition>

    <transition name="fade">
      <div v-if="taskStore.tasks.length > 0" class="task-list-container">
        <TaskList />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import TaskForm from '@/components/TaskForm.vue'
import TaskList from '@/components/TaskList.vue'

const taskStore = useTaskStore()
const showForm = ref(false)

onMounted(async () => {
  await taskStore.getTasks()
})

const handleFormSubmit = async () => {
  await taskStore.getTasks()
  showForm.value = false
}
</script>

<style scoped>
.home-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
}

.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.add-task-btn {
  font-size: 50px;
  border: none;
  background-color: #4CAF50;
  color: white;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
}

.add-task-btn:hover {
  transform: scale(1.1);
}


.task-form-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition: opacity 0.6s ease;
}

.task-form-container-enter-active,
.task-form-container-leave-active {
  transition: opacity 0.6s ease;
}

.task-form-container-enter,
.task-form-container-leave-to {
  opacity: 10;
}

.task-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: opacity 0.5s ease;
}

.task-list-container-enter-active,
.task-list-container-leave-active {
  transition: opacity 0.5s ease;
}

.task-list-container-enter,
.task-list-container-leave-to {
  opacity: 0;
}

.add-task-btn-float {
  position: fixed;
  bottom: 30px;
  right: 30px;
  font-size: 40px;
  border: none;
  background-color: #4CAF50;
  color: white;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-task-btn-float:hover {
  transform: scale(1.1);
}
</style>
