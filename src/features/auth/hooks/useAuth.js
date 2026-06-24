import { useContext, useEffect } from "react"
import { AuthContext } from "../auth.contex"
import {login,register,logout,getMe} from "../services/auth.api"


export const useAuth = () => {
    const context = useContext(AuthContext)

    const { user, setUser, loading, setLoading } = context

    const handleLogin = async (email, password) => {
        try {
        setLoading(true)

        const data = await login(email, password)
        setUser(data?.user)
        setLoading(false)

        } catch (error) {
console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async(email,password) => {
        try {
            
        setLoading(true)

        const data = await register(email, password,username)

        setUser(data?.user)
        setLoading(false)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
            
        setLoading(true)
        const data = await logout()
        setUser(null)
        setLoading(false)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                
            const data = await getMe()
            console.log(data)
            setUser(data?.user || null)
            setLoading(false)
            
        } catch (error) {
                console.log(error)
                setUser(null)
        } finally {
            
            setLoading(false)
            }
        }

        getAndSetUser()
    }, [])


    return {user,loading,handleRegister,handleLogin,handleLogout}
}