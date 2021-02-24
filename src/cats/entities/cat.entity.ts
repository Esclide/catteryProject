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

    @ManyToOne(type => User, user => user.bredCats)
    breeder: User

    @ManyToOne(type => User, user => user.ownedCats)
    owner: User

    @OneToMany(type => FemaleCat, cat => cat.children, {nullable: true})
    mother: Cat

    @OneToMany(type => MaleCat, cat => cat.children, {nullable: true})
    father: Cat

    @ManyToOne(type => Breed, breed => breed.cats, {eager: true})
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

@Entity()
export class FemaleCat extends Cat{
    @Column({enum: ['male', 'female'], default: 'female'})
    gender: string;

    @ManyToOne(type => FemaleCat, cat => cat.mother)
    children: Cat[]
}

@Entity()
export class MaleCat extends Cat{
    @Column({enum: ['male', 'female'], default: 'male'})
    gender: string;

    @ManyToOne(type => MaleCat, cat => cat.father)
    children: Cat[]
}