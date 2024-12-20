import { Entity, ManyToOne } from "typeorm"

@Entity()

export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    year: number

    @ManyToOne(() => User, (user) => user.fleet)
    user: User
}