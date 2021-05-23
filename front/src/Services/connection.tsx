import axios from 'axios'

export async function login(email: string, password: string): Promise<boolean> {
    let result;
    const data = new URLSearchParams({
        email: email,
        password: password
    })
    const url = "http://localhost:8080/user/login"
    try {
        result = await axios.post(url, data);
        console.log('login =', result.data);
        localStorage.setItem('token', result.data.token);
        return true
    } catch (err) {
        return false
    }
}

export async function register(name: string, email: string, password: string): Promise<boolean> {
    let result;
    const data = new URLSearchParams({
        email: email,
        password: password,
        name: name
    })

    const url = "http://localhost:8080/user/rigister"
    try {
        result = await axios.post(url, data);
        console.log('register =', result.data);
        return true
    } catch (err) {
        return false
    }
}