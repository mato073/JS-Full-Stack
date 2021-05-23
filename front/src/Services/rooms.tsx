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