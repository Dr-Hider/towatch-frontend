import type { AuthRequest, AuthResponse, ErrorResponse } from '../types/auth'
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
            body: JSON.stringify(body)
        })

        const token: string = authResponse.token

        localStorage.setItem('token', token)

        return 'OK'
    } catch (error: unknown) {
        const message: string | undefined = (error as FetchError<ErrorResponse>).data?.message
        
        if (message === undefined) {
            return 'An error occured'
        }

        else {
            return message.toString()
        }
    }
}
