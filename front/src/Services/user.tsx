import axios from 'axios'

export async function getUser(): Promise<any> {
    const token = localStorage.getItem('token');
    let result: any;
    const url = `http://localhost:8080/user/${token}`
    try {
        result = await axios.get(url);
        return { user: result.data, status: true };
    } catch (err) {
        console.error('err =', err.message);
        return { user: null, status: false }
    }
}