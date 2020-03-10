import { IsNumber, IsString } from 'class-validator'

export class RequestAnalytics {
  @IsString()
  origin: string

  @IsNumber()
  ts: number
}
