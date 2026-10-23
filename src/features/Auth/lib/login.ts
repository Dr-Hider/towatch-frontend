import type { AuthRequest, AuthResponse, ErrorResponse } from '../types/auth'
import type { FetchError } from 'ofetch'

export async function login(username: string, password: string): Promise<string> {
    const apiUrl: string = useRuntimeConfig().public.apiBase

    const body: AuthRequest = {
        username: username,
        password: password
    }

    try {
        const authResponse: AuthResponse = await $fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(body)
        })

        const token: string = authResponse.token

        localStorage.setItem('token', token)

        return 'OK'
    } catch (error: unknown) {
        const message: string = (error as FetchError<ErrorResponse>).data?.message.toString() ?? 'An error occurred'
        return message
    }
}
