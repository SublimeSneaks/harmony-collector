import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn
} from 'typeorm'
import { Transform, Type } from 'class-transformer'
import { serializeType, transformType } from '../utils'

import { BrowserData } from '../data/BrowserData'
import { RequestEntity } from './Request'

@Entity('browser')
export class BrowserEntity extends BaseEntity {
  @PrimaryColumn('text')
  id: string

  @Type(serializeType(BrowserData))
  @Transform(transformType(BrowserData))
  @Column('jsonb')
  browser: Object

  @OneToOne(serializeType(RequestEntity))
  @JoinColumn()
  request: RequestEntity

  @CreateDateColumn()
  createdAt: Date
}
