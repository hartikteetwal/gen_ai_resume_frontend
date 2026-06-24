import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

export async function register(username, email, password) {
    try {

        const res = await api.post("/api/auth/register", { username, email, password })

        if (res?.data?.success) {
            return res.data
        }    

    } catch (error) {
        console.log(error)
    }

}

export async function login(email, password) {
    try {

        const res = await api.post("/api/auth/login", { email, password })

        if (res?.data?.success) {
            return res.data
        }

    } catch (error) {
        console.log(error)
    }
}

export async function logout() {
    try {

        const res = await api.get("/api/auth/logout")

        if (res?.data?.success) {
            return res.data
        }

    } catch (error) {
        console.log(error)
    }
}

export async function getMe() {
    try {
        const res = await api.get("/api/auth/get-me")
        if (res?.data) {   
            return res?.data || null
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
        return null
    }
}