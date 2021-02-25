import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../../users/entities/user.entity";
import {Breed} from "./breed.entity";
import {Exclude} from "class-transformer";

@Entity()
export class Cat {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({})
    name: string;

    @Column({nullable: true})
    title: string;

    @Column({enum: ['male', 'female']})
    gender: string;

    @ManyToOne(type => User, user => user.bredCats, {nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE'})
    breeder: User

    @ManyToOne(type => User, user => user.ownedCats, {nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE'})
    owner: User

    @ManyToOne(type => Cat, cat => cat.motherChildren, {nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE'})
    mother: Cat

    @OneToMany(type => Cat, cat => cat.mother)
    motherChildren: Cat[]

    @ManyToOne(type => Cat, cat => cat.fatherChildren, {nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE'})
    father: Cat

    @OneToMany(type => Cat, cat => cat.mother)
    fatherChildren: Cat[]

    @ManyToOne(type => Breed, breed => breed.cats, {eager: true, nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE'})
    breed: Breed

    @Column({})
    color: string;

    @Column({})
    birthDate: Date;

    @Column({default: true})
    abilityToReproduce: Boolean;

    @Column({nullable: true})
    description: string;

    @Column({default: true})
    isAlive: Boolean;

    @Column({default: false})
    isDeleted: Boolean;

    @Column({ nullable: true })
    @Exclude()
    deletionDate: Date;
}