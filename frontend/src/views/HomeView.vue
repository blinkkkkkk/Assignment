<template>
  <div>
    <task-form />
    <task-list />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskForm from '../components/TaskForm.vue';
import TaskList from '../components/TaskList.vue';

export default defineComponent({
  components: { TaskForm, TaskList },
});
</script>

<style scoped></style>
