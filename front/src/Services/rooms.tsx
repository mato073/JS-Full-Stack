import axios from 'axios'

export async function getAllRooms() {
    const url = "http://localhost:8080/room/rooms"
    try {
        const result = await axios.get(url);
        return { rooms: result.data, sussec: true };
    } catch (err) {
        return { sussec: false }
    }
}

export async function getRoom(link: string) {
    let data;
    try {
        data = await axios.get(`http://localhost:8080/room/${link}`);
        return data.data;
    } catch (err) {
        return err.response.data;
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

export async function SavePosition(data: any, link: string) {
    const url = `http://localhost:8080/room/newPosition/${link}`

    const body = new URLSearchParams({
        newPosition: JSON.stringify(data)
    })
    try {
        const result = await axios.post(url, body)
    } catch (err) {
        console.error('err =', err);
    }

}

export async function joinRoom(link: string) {
    const token = localStorage.getItem('token')

    const url = `http://localhost:8080/room/join/${token}`
    const data = new URLSearchParams({
        link: link
    })
    try {
        const result = await axios.patch(url, data)
        return result.data
    } catch (err) {
        return err.response.data;
    }
}