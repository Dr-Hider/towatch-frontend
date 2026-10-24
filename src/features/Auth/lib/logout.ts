export function logout() {
    const { authLogout } = useAuth()
    
    localStorage.removeItem('token')
    authLogout()
    return navigateTo('/login')
}
