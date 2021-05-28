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

    tada: any;
    getRooms() {
        return this.roomsRepository.find();
    }

    async getRoom(link: string) {
        let { name, creator, players, board } = await this.roomsRepository.findOne({ link });
        players = JSON.parse(players);
        creator = JSON.parse(creator);
        board = JSON.parse(board);
        this.tada = { name, creator, players, board }
        return { name, creator, players, board }
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
            id: user.id
        }
        playes.push(newUser);
        console.log("number =", Object.keys(playes).length);

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
            id: user.id
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
            return (err);
        }
    }

    async getUserStatus(user: { name: string, id: number }, link: string) {
        let room = await this.roomsRepository.findOne({ link });
        const users = JSON.parse(room.players);
        const index = Object(users).findIndex((el: any) => el.id === user.id);

        if (index === -1) {
            //add user in db
            console.log('user not in db !');
            return { status: 400, users: {} }

        } else {
            users[index].status = 'online'
            room.players = JSON.stringify(users);
            this.roomsRepository.save(room);
            return { status: 200, users: users }
        }
    }

    async playerDisconect(userId: number, link: string) {
        let room = await this.roomsRepository.findOne({ link });
        const users = JSON.parse(room.players);
        const index = Object(users).findIndex((el: any) => el.id === userId);
        users[index].status = 'ofline'
        room.players = JSON.stringify(users);
        this.roomsRepository.save(room);
        return { status: 200, users: users }
    }

    async getIdFromToken(token: string) {
        const { id } = await this.jwtService.verifyAsync(token);
        return id;
    }
}