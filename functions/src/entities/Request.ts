import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('request')
export class RequestEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  uid: string

  @Column()
  origin: string

  @Column()
  url: string

  @Column()
  version: string

  @Column()
  ts: Date
}
