import { getMe } from '~/features/Auth'

export default defineNuxtRouteMiddleware(async (to) => {
    const { authLogin } = useAuth()

    const token: string = localStorage.getItem('token') ?? ''

    if (to.path === '/login') {
        if (!token) {
            return
        }

        const response = await getMe(token)

        if (response === 'OK') {
            authLogin()
            return navigateTo('/')
        }

        return
    }
    
    if (!token) {
        return navigateTo('/login')
    }

    const response = await getMe(token)

    if (response !== 'OK') {
        return navigateTo('/login')
    }

    authLogin()
})
