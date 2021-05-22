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
    /* 
        login(email: string, password: string) {
    
        }
    
        getUser(email: string) {
            return this.usersRepository.find();
        } */
}