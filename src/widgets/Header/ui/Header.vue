<script setup lang="ts">
import { LogoutButton } from '~/features/Auth'
</script>

<template>
    <header class="m-2 md:m-4 mb-6 flex flex-row items-center justify-between">
        <img class="w-28 md:w-64"
        src="~/assets/svg/logo/logo.svg">

        <LogoutButton />
    </header>
</template>
