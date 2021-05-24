import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.model'
import { Rooms } from './room.entity'
import { JwtService } from '@nestjs/jwt';
import { Users } from '../Oauth/user.entity'
import { v4 as uuidv4 } from 'uuid';
const position = require('./position.json')

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
        return position
    }
    async joinRooms(link, token) {
        const id = await this.getIdFromToken(token);
        const user = await this.usersRepository.findOne({ id });
        const room = await this.roomsRepository.findOne({ link });
        if (!room || !user) {
            throw new NotFoundException('The link is invalid ! or no room exist')
        } else if (room.status === 'offline') {
            throw new NotFoundException('The room is currently offline')
        }

        const playes = JSON.parse(room.players);
        if (playes.lenthe === 6)
            throw new NotFoundException('The room is full')
        playes.push(user);
        room.players = JSON.stringify(playes);
        await this.roomsRepository.save(room);
        return ('Player add to the gaem')
    }

    async postRoom(name: string, token: string,) {
        const id = await this.getIdFromToken(token);
        const link = uuidv4();
        const date = new Date();
        const user = await this.usersRepository.findOne({ id });
        const player = []
        player.push(user);
        const room = new Room(name, link, date, JSON.stringify([user]), JSON.stringify(player));

        try {
            this.roomsRepository.insert(room);
            return ('Room successfully created');
        } catch (err) {
            return (err);
        }
    }

    async getIdFromToken(token: string) {
        const { id } = await this.jwtService.verifyAsync(token);
        return id;
    }
}