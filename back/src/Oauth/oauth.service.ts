import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.model'
import { Users } from './user.entity'
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OauthService {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        private jwtService: JwtService
    ) { }
    users: User[] = [];

    async login(email: string, password: string) {
        const user = await this.usersRepository.findOne({email});

        if (!user) {
            throw new BadRequestException('Bad email or password !')
        }
        if (!(await bcrypt.compare(password, user.password))) {
            throw new BadRequestException('Bad email or password !')
        }

        const jwt = await this.jwtService.signAsync({id: user.id});
        return {status: 200, message: 'the user is login !', token: jwt};
    }

    async postUser(name: string, email: string, password: string) {

        const hashedPassword = await bcrypt.hash(password, 8);

        const user = new User(name, email, hashedPassword);
        this.usersRepository.insert(user);
        return ("User have bean created");
    }

    async getUser(token: string) {
        const id = await this.getIdFromToken(token);
        return this.usersRepository.findOne({id});
    }

    async getIdFromToken(token: string) {
        const { id } =  await this.jwtService.verifyAsync(token);
        return id;
    } 
}

