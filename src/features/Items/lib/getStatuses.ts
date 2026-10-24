import type { Status } from '../types/status'
import type { ErrorResponse } from '~/shared/Error'
import type { FetchError } from 'ofetch'

export async function getStatuses(): Promise<Status[]> {
    const apiUrl: string = useRuntimeConfig().public.apiBase

    try {
        const response: Status[] = await $fetch(`${apiUrl}/statuses`)

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
