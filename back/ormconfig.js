import {Users} from './src/Oauth/user.entity'
import {Rooms} from './src/Rooms/room.entity'

const config = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "jsfullstack",
    "entities": [Users, Rooms],
    "synchronize": true
}

export default config;