import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('timestamp')
export class TimestampEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  start: Date

  @Column({ nullable: true })
  listeners: Date | null

  @Column({ nullable: true })
  event: Date
}
