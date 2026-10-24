import type { Type } from '../types/type'
import type { ErrorResponse } from '~/shared/Error'
import type { FetchError } from 'ofetch'

export async function getTypes(): Promise<Type[]> {
    const apiUrl: string = useRuntimeConfig().public.apiBase

    try {
        const response: Type[] = await $fetch(`${apiUrl}/types`)

        return response
    } catch (error: unknown) {
        const fetchError: FetchError = (error as FetchError<ErrorResponse>)

        const message: string | undefined = fetchError.data?.message
        const code: number | undefined = fetchError.response?.status

        if (message === undefined && code !== undefined) {
            return [{
                id: -1,
                name: `${code} error occurred`,
            }]
        }

        else if (message !== undefined) {
            return [{
                id: -1,
                name: message.toString()
            }]
        }

        return [{
            id: -1,
            name: 'An error occurred'
        }]
    }
}
