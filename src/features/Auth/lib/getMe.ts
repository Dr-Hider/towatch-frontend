import type { MeResponse } from '../types/auth'
import type { ErrorResponse } from '~/shared/Error'
import type { FetchError } from 'ofetch'

export async function getMe(token: string): Promise<string> {
    const apiUrl: string = useRuntimeConfig().public.apiBase

    try {
        const authResponse: MeResponse = await $fetch(`${apiUrl}/auth/me`, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })

        const id: number = authResponse.id
        const username: string = authResponse.username

        localStorage.setItem('id', id.toString())
        localStorage.setItem('username', username)

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
