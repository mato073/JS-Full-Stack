import {Users} from './src/Oauth/user.entity'
const config = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "jsfullstack",
    "entities": [Users],
    "synchronize": true
}

export default config;