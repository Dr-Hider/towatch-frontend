import type { Item, ItemRequest } from '../types/item'
import type { ErrorResponse } from '~/shared/Error'
import type { FetchError } from 'ofetch'

export async function deleteItem(id: number): Promise<string> {
    const apiUrl: string = useRuntimeConfig().public.apiBase
    const token: string = localStorage.getItem('token') ?? ''

    if (!token) {
        return 'Unauthorized'
    }

    try {
        const response: Item = await $fetch(`${apiUrl}/items/${id}`, {
            method: 'DELETE',
            headers: {
                "authorization": `Bearer ${token}`
            }
        })

        return 'OK'
    } catch (error: unknown) {
        const fetchError: FetchError = (error as FetchError<ErrorResponse>)

        const message: string | undefined = fetchError.data?.message
        const code: number | undefined = fetchError.response?.status

        if (message === undefined && code !== undefined) {
            return `${code} error occurred`
        }

        else if (message !== undefined) {
            return message.toString()
        }

        return 'An error occurred'
    }
}
