<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { login } from '../lib/login'
import { register } from '../lib/register'

const formTitle = ref('Вход')
const submitButtonText= ref('Войти')
const changeModeButtonText = ref('Зарегистрироваться')

const username = ref('')
const password = ref('')
const messages = ref<string[]>([])

onMounted(() => {
    username.value = ''
    password.value = ''
    messages.value = []
})

function changeMode() {
    if (formTitle.value === 'Вход') {
        formTitle.value = 'Регистрация'
        submitButtonText.value = 'Зарегистрироваться'
        changeModeButtonText.value = 'Войти'

        username.value = ''
        password.value = ''
        messages.value = []
    }

    else {
        formTitle.value = 'Вход'
        submitButtonText.value = 'Войти'
        changeModeButtonText.value = 'Зарегистрироваться'

        username.value = ''
        password.value = ''
        messages.value = []
    }
}

async function submitForm() {
    let response: string = '';

    if (formTitle.value === 'Вход') {
        response = await login(username.value, password.value)
    }
    
    else {
        response = await register(username.value, password.value)
    }

    console.log(response)

    if (response === 'OK') {
        return navigateTo('/')
    }

    messages.value = response.split('|')
}
</script>

<template>
    <h1 class="text-6xl font-bold">{{ formTitle }}</h1>

    <form class="flex flex-col items-center gap-4"
    @submit.prevent="submitForm">
        <input v-model="username"
        class="border border-neutral-300 rounded-lg p-2.5"
        type="text" placeholder="Имя пользователя">

        <input v-model="password"
        class="border border-neutral-300 rounded-lg p-2.5"
        type="password" placeholder="Пароль">

        <button class="rounded-3xl bg-blue-900 hover:bg-blue-950 p-3 cursor-pointer font-bold"
        type="submit">{{ submitButtonText }}</button>

        <p v-if="messages.length > 0" v-for="message in messages"
        class="text-red-600">{{ message }}</p>
    </form>

    <button class="rounded-3xl bg-neutral-200 hover:bg-neutral-500 text-black p-3 cursor-pointer font-bold"
    type="button"
    @click="changeMode">{{ changeModeButtonText }}</button>
</template>
