import type { MeResponse, ErrorResponse } from '../types/auth'
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
        const message: string | undefined = (error as FetchError<ErrorResponse>).data?.message
        
        if (message === undefined) {
            return 'An error occured'
        }

        else {
            return message.toString()
        }
    }
}
