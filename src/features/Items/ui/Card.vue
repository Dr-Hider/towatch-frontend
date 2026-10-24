<script setup lang="ts">
import { ref } from 'vue'
import type { Type } from '../types/type'
import type { Status } from '../types/status'
import type { Item } from '../types/item'
import { updateItem } from '../lib/updateItem'
import { deleteItem } from '../lib/deleteItem'

interface Props {
    id: number
    title: string
    typeId: number
    statusId: number
    types: Type[]
    statuses: Status[]
}

const props = defineProps<Props>()
const emit = defineEmits<{'deleted': [id: number]}>()

const id = props.id
const title = ref(props.title)
const typeId = ref(props.typeId)
const statusId = ref(props.statusId)

const types = ref<Type[]>(props.types)
const statuses = ref<Status[]>(props.statuses)

const messages = ref<string[]>([])

const editMode = ref(false)
const editButtonCaption = ref('Изменить')

async function editButtonClick() {
    if (!editMode.value) {
        editMode.value = true
        editButtonCaption.value = 'Сохранить'
        return
    }

    const response: Item = await updateItem(id, title.value, typeId.value, statusId.value)

    if (response.id !== -1) {
        title.value = response.title
        typeId.value = response.typeId
        statusId.value = response.statusId

        editMode.value = false
        editButtonCaption.value = 'Изменить'
        messages.value = []
        return
    }

    messages.value = response.title.split('|')
}

async function deleteButtonClick() {
    const response: string = await deleteItem(id)

    if (response === 'OK') {
        emit('deleted', id)
        return
    }

    messages.value = response.split('|')
}
</script>

<template>
    <div class="flex flex-col items-center gap-2.5">
        <div class="md:h-11 flex flex-col md:flex-row items-center gap-2.5">
            <input v-model="title"
            :disabled="!editMode"
            class="md:h-full w-48 md:w-96 border-2 rounded-lg p-2"
            :class="{'border-neutral-500': !editMode, 'border-green-600': editMode}"
            type="text" placeholder="Название">

            <select v-model="typeId"
            :disabled="!editMode"
            class="md:h-full w-48 md:w-36 border-2 rounded-lg p-2"
            :class="{'border-neutral-500': !editMode, 'border-green-600': editMode}">
                <option v-for="type in types"
                :value="type.id">{{ type.name }}</option>
            </select>

            <select v-model="statusId"
            :disabled="!editMode"
            class="md:h-full w-48 md:w-36 border-2 rounded-lg p-2"
            :class="{'border-neutral-500': !editMode, 'border-green-600': editMode}">
                <option v-for="status in statuses"
                :value="status.id">{{ status.name }}</option>
            </select>

            <button class="md:h-full w-28 rounded-lg p-2 cursor-pointer"
            :class="{'bg-yellow-700 hover:bg-yellow-900': !editMode, 'bg-green-800 hover:bg-green-900': editMode}"
            type="button"
            @click="editButtonClick">{{ editButtonCaption }}</button>

            <button class="md:h-full w-28 rounded-lg bg-red-600 hover:bg-red-900 p-2 cursor-pointer"
            type="button"
            @click="deleteButtonClick">Удалить</button>
        </div>

        <p v-if="messages.length > 0" v-for="message in messages"
        class="text-red-600">{{ message }}</p>
    </div>
</template>
