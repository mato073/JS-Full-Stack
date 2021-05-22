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

    async StartRooms(userid, link) {
        const rooms = await this.roomsRepository.find(userid);
        if (!rooms) {
            throw new NotFoundException('No rooms found')
        }
        const room = rooms.find(link);
        if (!room) {
            throw new NotFoundException('No room found')
        }
        if (room.status === 'offline') {
            //patch the status
        } else {
            throw new NotFoundException('the room is alrady started')
        }
    }

    async StopRooms(userid, link) {
        const rooms = await this.roomsRepository.find(userid);
        if (!rooms) {
            throw new NotFoundException('No rooms found')
        }
        const room = rooms.find(link);
        if (!room) {
            throw new NotFoundException('No room found')
        }
        if (room.status === 'online') {
            //patch the status
        } else {
            throw new NotFoundException('the room is alrady stoped')
        }
    }

    async joinRooms(link, token) {
        const id = await this.getIdFromToken(token);
        const user = await this.usersRepository.findOne({id});
        const room = await this.roomsRepository.findOne({link});
        if (!room || !user) {
            throw new NotFoundException('The link is invalid ! or no room exist')
        }/*  else if (room.status === 'offline') {
            throw new NotFoundException('The room is currently offline')
        } */
        const playes = JSON.parse(room.players);
        playes.push(user);
        room.players = JSON.stringify(playes);
        await this.roomsRepository.save(room);
        return( 'Player add to the gaem')
    }

    async postRoom(name: string, token: string,) {
        const id = await this.getIdFromToken(token);
        const link = uuidv4();
        const date = new Date();
        const user = await this.usersRepository.findOne({id});
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