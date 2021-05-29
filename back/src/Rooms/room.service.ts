import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.model'
import { Rooms } from './room.entity'
import { JwtService } from '@nestjs/jwt';
import { Users } from '../Oauth/user.entity'
import { v4 as uuidv4 } from 'uuid';



@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(Rooms) private roomsRepository: Repository<Rooms>,
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        private jwtService: JwtService
    ) { }

    getRooms() {
        return this.roomsRepository.find();
    }

    async getRoom(link: string) {
        if (link === undefined || link === null) {
            throw new NotFoundException({ room: null, status: 400 })
        }
        const room = await this.roomsRepository.findOne({ link });
        if (!room) {
            throw new NotFoundException({ room: null, status: 400 })
        }
        const data = {
            players: JSON.parse(room.players),
            creator: JSON.parse(room.creator),
            board: JSON.parse(room.board),
            turn: room.turn
        }
        return { room: data, status: 200 };
    }

    async savePosition(link: string, newPosition: string) {
        const room = await this.roomsRepository.findOne({ link });
        if (!room) {
            throw new NotFoundException('No rooms found')
        }
        room.board = newPosition;
        await this.roomsRepository.save(room);
        return { message: 'sucess', status: 200 }
    }

    async StartRooms(link: string, token: string) {
        const id = await this.getIdFromToken(token);
        const room = await this.roomsRepository.findOne({ link });
        if (!room) {
            throw new NotFoundException('No rooms found')
        }
        const param = JSON.parse(room.creator);
        if (param[0].id !== id)
            throw new NotFoundException('The user dos not own the room')
        if (room.status === 'offline') {
            room.status = 'online'
            await this.roomsRepository.save(room);
            return ({ message: 'the game start', status: 200 })
        } else {
            throw new NotFoundException('the room is alrady started')
        }
    }

    async StopRooms(link: string, token: string) {
        const id = await this.getIdFromToken(token);
        const room = await this.roomsRepository.findOne({ link });
        if (!room) {
            throw new NotFoundException('No rooms found')
        }
        const param = JSON.parse(room.creator);
        if (param[0].id != id)
            throw new NotFoundException('The user dos not own the room')
        if (room.status === 'online') {
            room.status = 'offline'
            await this.roomsRepository.save(room);
            return ({ message: 'the game stop', status: 200 })
        } else {
            throw new NotFoundException('the room is alrady started')
        }
    }

    getPosition() {
        return null
    }
    async joinRooms(link: string, token: string) {
        const id = await this.getIdFromToken(token);
        const user = await this.usersRepository.findOne({ id });
        const room = await this.roomsRepository.findOne({ link });

        if (!room || !user) {
            throw new NotFoundException('The link is invalid ! or no room exist')
        } else if (room.status === 'online') {
            throw new NotFoundException('The has alrady started')
        }

        const playes = JSON.parse(room.players);
        if ((Object.keys(playes).length - 1) === 6)
            throw new NotFoundException('The room is full')
        const colors = ['purple', 'blue', 'green', 'yellow', 'orange']
        const newUser = {
            color: colors[(Object.keys(playes).length - 1)],
            name: user.name,
            id: user.id,
            status: 'ofline'
        }
        playes.push(newUser);

        room.players = JSON.stringify(playes);
        await this.roomsRepository.save(room);
        return { status: 200, message: 'Player added to the room' }
    }

    async postRoom(name: string, token: string,) {
        const id = await this.getIdFromToken(token);
        const link = uuidv4();
        const date = new Date();
        const user = await this.usersRepository.findOne({ id });
        const player = []
        const newUser = {
            color: 'red',
            name: user.name,
            id: user.id,
            status: 'ofline'
        }
        const creator = {
            name: user.name,
            id: user.id
        }
        player.push(newUser);
        const room = new Room(name, link, date, JSON.stringify([creator]), JSON.stringify(player));
        //add room in creator  db
        try {
            this.roomsRepository.insert(room);
            return { link: link, status: 200 };
        } catch (err) {
            throw new NotFoundException(err)
        }
    }

    async getUserStatus(user: { name: string, id: number }, link: string) {
        let room: Room = await this.roomsRepository.findOne({ link });
        if (!room) {
            return { status: 400, users: [] }
        }
        const users = JSON.parse(room.players);
        const index = Object(users).findIndex((el: any) => el.id === user.id);

        if (index === -1) {
            const colors = ['purple', 'blue', 'green', 'yellow', 'orange']
            const newUser = {
                color: colors[(Object.keys(users).length - 1)],
                name: user.name,
                id: user.id,
                status: 'online'
            }
            users.push(newUser);
            room.players = JSON.stringify(users);
            this.roomsRepository.save(room);
            console.log('User added in db');
            return { status: 201, users: users, color: newUser.color }
        } else {
            users[index].status = 'online'
            room.players = JSON.stringify(users);
            this.roomsRepository.save(room);
            return { status: 200, users: users }
        }
    }

    async playerDisconect(userId: number, link: string) {
        const room: Room = await this.roomsRepository.findOne({ link });
        if (!room) {
            return { status: 400, users: [] }
        }
        const users = JSON.parse(room.players);
        const index = Object(users).findIndex((el: any) => el.id === userId);
        users[index].status = 'ofline'
        room.players = JSON.stringify(users);
        this.roomsRepository.save(room);
        return { status: 200, users: users }
    }

    async newTurn(link: string, color: string) {
        let room = await this.roomsRepository.findOne({ link });
        room.turn = color;
        this.roomsRepository.save(room);
    }

    async getIdFromToken(token: string) {
        const { id } = await this.jwtService.verifyAsync(token);
        return id;
    }
}