export function logout() {
    localStorage.removeItem('token')
    return navigateTo('/login')
}
