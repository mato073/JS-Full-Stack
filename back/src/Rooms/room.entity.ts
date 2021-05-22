import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Rooms {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    link: string;
    
    @Column()
    name: string;

    @Column({default: 'offline'})
    status: string;

    @Column()
    date: Date;

    @Column()
    creator: string;
    
    @Column({ default: null, type:"longtext"})
    players: string;
}