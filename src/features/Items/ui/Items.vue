<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getItems } from '../lib/getItems'
import { getTypes } from '../lib/getTypes'
import { getStatuses } from '../lib/getStatuses'
import type { Item } from '../types/item'
import type { Type } from '../types/type'
import type { Status } from '../types/status'
import Card from './Card.vue'
import CreateForm from './CreateForm.vue'

const items = ref<Item[]>([])

const message = ref('')

const types = ref<Type[]>([])
const statuses = ref<Status[]>([])

const ready = ref(false)

onMounted(async () => {
    message.value = ''
    items.value = []

    const itemsResponse: Item[] = await getItems()

    const typesResponse: Type[] = await getTypes()
    const statusesResponse: Status[] = await getStatuses()

    if (typesResponse[0]?.id === -1) {
        message.value = typesResponse[0].name
        return
    }

    if (statusesResponse[0]?.id === -1) {
        message.value = statusesResponse[0].name
        return
    }

    types.value = typesResponse
    statuses.value = statusesResponse

    if (itemsResponse.length === 0) {
        message.value = 'Очередь пуста'
    }

    else if (itemsResponse[0]?.id === -1) {
        message.value = itemsResponse[0].title
        return
    }

    items.value = itemsResponse
    ready.value = true
})

function onCreated(item: Item) {
    items.value.push(item)
    message.value = ''
}

function onDeleted(id: number) {
    let deletedItem: Item

    items.value.forEach(item => {
        if (item.id === id) {
            deletedItem = item
        }
    })

    const newItems: Item[] = items.value.filter(item => item !== deletedItem)
    items.value = newItems

    if (items.value.length === 0) {
        message.value = 'Очередь пуста'
    }
}
</script>

<template>
    <section class="flex flex-col items-center gap-10">
        <h1 class="text-4xl md:text-5xl font-bold">Моя очередь</h1>

        <p v-if="message !== ''"
        class="text-3xl md:text-4xl text-neutral-500 text-bold">{{ message }}</p>

        <Card v-if="ready" v-for="item in items"
        :id="item.id"
        :title="item.title"
        :typeId="item.typeId"
        :statusId="item.statusId"
        :types="types"
        :statuses="statuses"
        @deleted="onDeleted" />

        <span v-if="ready"></span>

        <h1 v-if="ready"
        class="text-4xl md:text-5xl font-bold">Добавить</h1>

        <CreateForm v-if="ready"
        :types="types"
        :statuses="statuses"
        @created="onCreated" />
    </section>
</template>
