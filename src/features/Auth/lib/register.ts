import type { AuthRequest, AuthResponse } from '../types/auth'
import type { ErrorResponse } from '~/shared/Error'
import type { FetchError } from 'ofetch'

export async function register(username: string, password: string): Promise<string> {
    const apiUrl: string = useRuntimeConfig().public.apiBase

    const body: AuthRequest = {
        username: username,
        password: password
    }

    try {
        const authResponse: AuthResponse = await $fetch(`${apiUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const token: string = authResponse.token

        localStorage.setItem('token', token)

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
