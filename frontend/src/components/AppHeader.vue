<template>
    <header class="header">
        <div class="logo">My Task App</div>
        <nav>
            <router-link to="/" class="nav-link">Home</router-link>
        </nav>
    </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 40px;
    background-color: #34495e;
    color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
    font-size: 1.8rem;
    font-weight: 600;
}

.nav-link {
    color: white;
    margin: 0 15px;
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 500;
}

.nav-link:hover {
    text-decoration: underline;
}

.nav-link.active {
    color: #2ecc71;
    /* Green for active link */
}
</style>