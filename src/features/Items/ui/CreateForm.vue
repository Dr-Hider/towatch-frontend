<script setup lang="ts">
import { ref } from 'vue'
import type { Type } from '../types/type'
import type { Status } from '../types/status'
import type { Item } from '../types/item'
import { createItem } from '../lib/createItem'

interface Props {
    types: Type[]
    statuses: Status[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
    'created': [item: Item]
}>()

const title = ref('')
const typeId = ref(1)
const statusId = ref(1)

const types = ref<Type[]>(props.types)
const statuses = ref<Status[]>(props.statuses)

const messages = ref<string[]>([])

async function submitForm() {

    const response: Item = await createItem(title.value, typeId.value, statusId.value)

    if (response.id !== -1) {
        emit('created', response)
        messages.value = []
        return
    }

    messages.value = response.title.split('|')
}
</script>

<template>
    <div class="flex flex-col items-center gap-2.5">
        <form class="md:h-11 flex flex-col md:flex-row items-center gap-2.5"
        @submit.prevent="submitForm">
            <input v-model="title"
            class="md:h-full w-48 md:w-96 border-2 rounded-lg border-neutral-500 p-2"
            type="text" placeholder="Название">

            <select v-model="typeId"
            class="md:h-full w-48 md:w-36 border-2 rounded-lg border-neutral-500 p-2">
                <option v-for="type in types"
                :value="type.id">{{ type.name }}</option>
            </select>

            <select v-model="statusId"
            class="md:h-full w-48 md:w-36 border-2 rounded-lg border-neutral-500 p-2">
                <option v-for="status in statuses"
                :value="status.id">{{ status.name }}</option>
            </select>

            <button class="md:h-full w-28 rounded-lg bg-blue-900 hover:bg-blue-950 p-2 cursor-pointer"
            type="submit">Добавить</button>
        </form>

        <p v-if="messages.length > 0" v-for="message in messages"
        class="text-red-600">{{ message }}</p>
    </div>
</template>
