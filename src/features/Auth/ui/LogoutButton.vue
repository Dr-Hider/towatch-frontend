<script setup lang="ts">
import { logout } from '../lib/logout'


</script>

<template>
    <button class="text-xs md:text-lg
    ml-auto
    border rounded-lg bg-neutral-200 hover:bg-neutral-500 text-black font-bold
    p-2 md:p-2.5
    cursor-pointer"
    type="button"
    @click="logout">Выйти</button>
</template>