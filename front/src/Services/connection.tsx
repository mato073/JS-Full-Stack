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
        //store the token
        return true
    } catch (err) {
        return false
    }
}

export async function register(name: string, email: string, password: string): Promise<boolean> {
    let result;
    const data = {
        "name": name,
        "email": email,
        "password": password
    }

    const url = "http://localhost:8080/user/rigister"
    try {
        result = await axios.post(url, data);
        return true
    } catch (err) {
        return false
    }
}