import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../../post/entities/Post";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 255 })
    email: string;
   
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'enum', enum: ['Aluno', 'Professor'] })
    role: 'Aluno' | 'Professor'

    @Column({ type: 'boolean', default: true})
    active: boolean; 
}