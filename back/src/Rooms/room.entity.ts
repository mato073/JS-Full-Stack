import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
const position = require('./position.json')

@Entity()
export class Rooms {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    link: string;

    @Column()
    name: string;

    @Column({ default: 'not started' })
    status: string;

    @Column()
    date: Date;

    @Column()
    creator: string;

    @Column({ default: null, type: "longtext" })
    players: string;

    @Column({ default: 'red', type: "text" })
    turn: string;

    @Column({ default: JSON.stringify(position), type: "longtext" })
    board: string;

    @Column({ default: 0 })
    round: number;
}