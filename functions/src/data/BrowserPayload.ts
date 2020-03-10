import { IsIn, IsString, ValidateNested } from 'class-validator'

import { BrowserData } from '../data/BrowserData'
import { RequestAnalytics } from './RequestAnalytics'
import { Type } from 'class-transformer'
import { serializeType } from '../utils'

export class BrowserPayload {
  @IsString()
  uid: string

  @IsIn(['browser'])
  from: 'browser'

  @ValidateNested()
  @Type(serializeType(BrowserData))
  data: BrowserData

  @ValidateNested()
  _a: RequestAnalytics
}
