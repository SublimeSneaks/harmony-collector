import { IsIn, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator'

class Location {
  @IsInt()
  xCoord: number

  @IsInt()
  yCoord: number
}

class Target {
  @IsString()
  tag: string

  @IsString()
  class: string

  @IsString()
  id: string
}

export class EventData {
  @IsIn(['mouse'])
  event: 'mouse'

  @IsInt()
  type: number

  @IsInt()
  delay: number

  @IsOptional()
  @ValidateNested()
  location?: Location

  @IsOptional()
  @ValidateNested()
  target?: Target
}
