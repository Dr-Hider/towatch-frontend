import type { Item, ItemRequest } from '../types/item'
import type { ErrorResponse } from '~/shared/Error'
import type { FetchError } from 'ofetch'

export async function createItem(
    title: string,
    typeId: number,
    statusId: number
): Promise<Item> {
    const apiUrl: string = useRuntimeConfig().public.apiBase
    const token: string = localStorage.getItem('token') ?? ''

    const body: ItemRequest = {
        title: title,
        typeId: typeId,
        statusId: statusId
    }

    if (!token) {
        return {
            id: -1,
            title: 'Unauthorized',
            typeId: -1,
            statusId: -1
        }
    }

    try {
        const response: Item = await $fetch(`${apiUrl}/items`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })

        return response
    } catch (error: unknown) {
        const fetchError: FetchError = (error as FetchError<ErrorResponse>)

        const message: string | undefined = fetchError.data?.message
        const code: number | undefined = fetchError.response?.status

        if (message === undefined && code !== undefined) {
            return {
                id: -1,
                title: `${code} error occurred`,
                typeId: -1,
                statusId: -1
            }
        }

        else if (message !== undefined) {
            return {
                id: -1,
                title: message.toString(),
                typeId: -1,
                statusId: -1
            }
        }

        return {
            id: -1,
            title: 'An error occurred',
            typeId: -1,
            statusId: -1
        }
    }
}
