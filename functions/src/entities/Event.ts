import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Transform, Type } from 'class-transformer'
import { serializeType, transformType } from '../utils'

import { EventData } from '../data/EventData'
import { RequestEntity } from './Request'
import { TimestampEntity } from './Timestamp'

@Entity('event')
export class EventEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Type(serializeType(EventData))
  @Transform(transformType(EventData))
  @Column('jsonb')
  event: Object

  @OneToOne(serializeType(TimestampEntity))
  @JoinColumn()
  timestamps: TimestampEntity

  @OneToOne(serializeType(RequestEntity))
  @JoinColumn()
  request: RequestEntity

  @CreateDateColumn()
  createdAt: Date
}
