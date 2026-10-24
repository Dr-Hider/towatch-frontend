<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { login } from '../lib/login'
import { register } from '../lib/register'

const { authLogin } = useAuth()

const formTitle = ref('Вход')
const submitButtonCaption= ref('Войти')
const changeModeButtonCaption = ref('Зарегистрироваться')
const hintCaption = ref('Нет аккаунта?')

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
        submitButtonCaption.value = 'Зарегистрироваться'
        changeModeButtonCaption.value = 'Войти'
        hintCaption.value = 'Есть аккаунт?'

        username.value = ''
        password.value = ''
        messages.value = []
    }

    else {
        formTitle.value = 'Вход'
        submitButtonCaption.value = 'Войти'
        changeModeButtonCaption.value = 'Зарегистрироваться'
        hintCaption.value = 'Нет аккаунта?'

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

    if (response === 'OK') {
        authLogin()
        return navigateTo('/')
    }

    messages.value = response.split('|')
}
</script>

<template>
    <h1 class="text-4xl md:text-5xl font-bold">{{ formTitle }}</h1>

    <form class="flex flex-col items-center gap-4"
    @submit.prevent="submitForm">
        <input v-model="username"
        class="w-48 md:w-64 border border-neutral-300 rounded-lg p-2.5"
        type="text" placeholder="Имя пользователя">

        <input v-model="password"
        class="w-48 md:w-64 border border-neutral-300 rounded-lg p-2.5"
        type="password" placeholder="Пароль">

        <button class="min-w-16 md:min-w-20 max-w-44 md:max-w-52
        rounded-3xl bg-blue-900 hover:bg-blue-950 p-3 cursor-pointer font-bold"
        type="submit">{{ submitButtonCaption }}</button>

        <p v-if="messages.length > 0" v-for="message in messages"
        class="text-red-600">{{ message }}</p>
    </form>

    <div class="flex flex-col items-center gap-2.5">
        <p class="text-base text-neutral-300">{{ hintCaption }}</p>
        <button class="min-w-16 md:min-w-20 max-w-44 md:max-w-52
        rounded-3xl bg-neutral-200 hover:bg-neutral-500 text-black p-3 cursor-pointer font-bold"
        type="button"
        @click="changeMode">{{ changeModeButtonCaption }}</button>
    </div>
</template>
