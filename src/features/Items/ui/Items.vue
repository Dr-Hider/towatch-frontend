<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getItems } from '../lib/getItems'
import { getTypes } from '../lib/getTypes'
import { getStatuses } from '../lib/getStatuses'
import type { Item } from '../types/item'
import type { Type } from '../types/type'
import type { Status } from '../types/status'
import Card from './Card.vue'

const items = ref<Item[]>([])

const message = ref('')

const types = ref<Type[]>([])
const statuses = ref<Status[]>([])

onMounted(async () => {
    message.value = ''
    items.value = []

    const itemsResponse: Item[] = await getItems()

    const typesResponse: Type[] = await getTypes()
    const statusesResponse: Status[] = await getStatuses()

    if (itemsResponse.length === 0) {
        message.value = 'Здесь пока ничего нет'
        return
    }

    else if (itemsResponse[0]?.id === -1) {
        message.value = itemsResponse[0].title
        return
    }

    items.value = itemsResponse

    types.value = typesResponse
    statuses.value = statusesResponse

    return
})
</script>

<template>
    <section class="flex flex-col items-center gap-8">
        <h1 class="text-6xl font-bold">Главная</h1>
        <Card v-if="message === ''" v-for="item in items"
        :id="item.id"
        :title="item.title"
        :typeId="item.typeId"
        :statusId="item.statusId"
        :types="types"
        :statuses="statuses" />

        <p v-if="message !== ''">{{ message }}</p>
    </section>
</template>
