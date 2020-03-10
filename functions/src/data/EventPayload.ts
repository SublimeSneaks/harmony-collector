import { IsArray, IsIn, IsString, ValidateNested } from 'class-validator'

import { EventData } from '../data/EventData'
import { RequestAnalytics } from './RequestAnalytics'
import { TimestampType } from '../interfaces/TimestampType.enum'
import { Type } from 'class-transformer'
import { serializeType } from '../utils'

export class EventPayload {
  @IsString()
  uid: string

  @IsIn(['event'])
  from: 'event'

  @IsArray()
  @ValidateNested({ each: true })
  @Type(serializeType(EventData))
  data: EventData[]

  @IsArray()
  timestamps: [number, TimestampType][]

  @ValidateNested()
  _a: RequestAnalytics
}
