import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {User} from './user.model'
import {Users} from './user.entity'

@Injectable()
export class OauthService {
    constructor( 
        @InjectRepository(Users)private usersRepository: Repository<Users>,
      ) {}
    users: User[] = [];

    postUser(name: string, email: string, password: string) {
        const user = new User(name, email, password);
        this.usersRepository.insert(user);
        return (user);
    }

    login(email: string, password: string) {

    }

    getUser(email: string) {
        return this.usersRepository.find();
    }
}

