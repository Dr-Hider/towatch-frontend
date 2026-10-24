export const useAuth = () => {
    const authState = useState<boolean>('loginState', () => false)

    const authLogin = () => {
        authState.value = true
    }

    const authLogout = () => {
        authState.value = false
    }

    return {
        authState,
        authLogin,
        authLogout
    }
}
