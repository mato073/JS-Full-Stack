import axios from 'axios'

export async function getAllRooms() {
    const url = "http://localhost:8080/room/rooms"
    try {
        const result = await axios.get(url);
        console.log('rooms =', result.data);
        return { rooms: result.data, sussec: true };
    } catch (err) {
        return { sussec: false }
    }
}

export async function newRoom(name: string) {
    const token = localStorage.getItem('token');
    if (!token)
        return { status: false };

    const url = `http://localhost:8080/room/${token}`
    const data = new URLSearchParams({
        name: name
    });
    try {
        const result = await axios.post(url, data);
        return { link: result.data.link, status: true };
    } catch (err) {
        return { status: false };
    }
}

export async function SavePosition(data: any) {
    const link = localStorage.getItem('link')

    const url = `http://localhost:8080/room/newPosition/${link}`
    console.log('data =', data);

    const body = new URLSearchParams({
        newPosition: JSON.stringify(data)
    })
    try {
        const result = await axios.post(url, body)
    } catch (err) {
        console.error('err =', err);
    }

}