import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.model'
import { Rooms } from './room.entity'

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(Rooms) private roomsRepository: Repository<Rooms>,
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

    async connectToRooms(link) {
        const room = await this.roomsRepository.find(link);
        if (!room) {
            throw new NotFoundException('The link is invalid ! or no room exist')
        } else if (room[0].status === 'offline') {
            throw new NotFoundException('The room is currently offline')
        }
        /* return this.roomsRepository.update() */
    }

    postRoom(name: string) {
        const link = uuidv4();
        const date = new Date();
        const room = new Room(name, link, date);
        console.log(room);

        try {
            this.roomsRepository.insert(room);
            return ('Room successfully created');
        } catch (err) {
            return (err);
        }
    }
}