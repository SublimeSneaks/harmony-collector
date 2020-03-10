import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Validate,
  ValidateNested
} from 'class-validator'

import { mrValidator } from '../validators/mr.validator'

class Math {
  @IsBoolean()
  hypot: boolean

  @IsBoolean()
  imul: boolean
}

class Plugins {
  @IsInt()
  count: number

  @IsString({ each: true })
  names: string[]
}

class ArrayClass {
  @IsBoolean()
  forEach: boolean
}

class Function {
  @IsBoolean()
  'return/*@cc_on!@*/!1': boolean

  @IsBoolean()
  bind: boolean
}

class Navigator {
  @IsString()
  userAgent: string

  @IsString()
  language: string

  @IsString()
  productSub: string

  @IsString()
  product: string

  @ValidateNested()
  plugins: Plugins

  @IsBoolean()
  onLine: boolean

  @IsBoolean()
  vibrate: boolean

  @IsBoolean()
  getBattery: boolean

  @IsBoolean()
  credentials: boolean

  @IsBoolean()
  appMinorVersion: boolean

  @IsBoolean()
  bluetooth: boolean

  @IsBoolean()
  storage: boolean

  @IsBoolean()
  getGamepads: boolean

  @IsBoolean()
  getStorageUpdates: boolean

  @IsBoolean()
  hardwareConcurrency: boolean

  @IsBoolean()
  mediaDevices: boolean

  @IsBoolean()
  mozAlarms: boolean

  @IsBoolean()
  mozConnection: boolean

  @IsBoolean()
  mozIsLocallyAvailable: boolean

  @IsBoolean()
  mozPhoneNumberService: boolean

  @IsBoolean()
  msManipulationViewsEnabled: boolean

  @IsBoolean()
  permissions: boolean

  @IsBoolean()
  registerProtocolHandler: boolean

  @IsBoolean()
  requestMediaKeySystemAccess: boolean

  @IsBoolean()
  requestWakeLock: boolean

  @IsBoolean()
  sendBeacon: boolean

  @IsBoolean()
  serviceWorker: boolean

  @IsBoolean()
  storeWebWideTrackingException: boolean

  @IsBoolean()
  webkitGetGamepads: boolean

  @IsBoolean()
  webkitTemporaryStorage: boolean

  @IsBoolean()
  cookieEnabled: boolean

  @IsBoolean()
  javaEnabled: boolean

  @IsNotEmpty()
  doNotTrack: string | -1

  @IsBoolean()
  parseInt: boolean

  @ValidateNested()
  Math: Math
}

class Window {
  @IsBoolean()
  addEventListener: boolean

  @IsBoolean()
  XMLHttpRequest: boolean

  @IsBoolean()
  XDomainRequest: boolean

  @IsBoolean()
  buffer: boolean

  @IsBoolean()
  emit: boolean

  @IsBoolean()
  DeviceOrientationEvent: boolean

  @IsBoolean()
  DeviceMotionEvent: boolean

  @IsBoolean()
  TouchEvent: boolean

  @IsBoolean()
  PointerEvent: boolean

  @IsBoolean()
  domAutomation: boolean

  @ValidateNested()
  Function: Function

  @ValidateNested()
  Array: ArrayClass

  @IsBoolean()
  spawn: boolean

  @IsBoolean()
  chrome: boolean

  @IsBoolean()
  _phantom: boolean

  @IsBoolean()
  webdriver: boolean

  @IsBoolean()
  callPhantom: boolean

  @IsBoolean()
  opera: boolean

  @IsBoolean()
  sessionStorage: boolean

  @IsBoolean()
  localStorage: boolean

  @IsBoolean()
  indexedDB: boolean

  @IsBoolean()
  InstallTrigger: boolean

  @IsBoolean()
  FileReader: boolean

  @IsBoolean()
  HTMLElement: boolean

  @IsBoolean()
  webRTC: boolean
}

class Screen {
  @IsNumber()
  width: number

  @IsNumber()
  height: number

  @IsNumber()
  availWidth: number

  @IsNumber()
  availHeight: number

  @IsNumber()
  colorDepth: number

  @IsNumber()
  pixelDepth: number

  @IsNumber()
  innerWidth: number

  @IsNumber()
  innerHeight: number

  @IsNumber()
  outerWidth: number

  @IsNumber()
  mozInnerScreenY: number
}

class Document {
  @IsString()
  documentMode: string

  @IsBoolean()
  XPathResult: boolean

  @IsBoolean()
  hidden: boolean

  @IsBoolean()
  msHidden: boolean

  @IsBoolean()
  webkitHidden: boolean

  @IsBoolean()
  driver: boolean

  @IsBoolean()
  webdriver: boolean

  @IsBoolean()
  selenium: boolean

  @IsBoolean()
  cdc_asdjflasutopfhvcZLmcfl_: boolean
}

class Canvas {
  @IsNumberString()
  '<@nv45. F1n63r,Pr1n71n6!': number

  @IsNumberString()
  'm,Ev!xV67BaU> eh2m<f3AG3@': number
}

export class BrowserData {
  @ValidateNested()
  navigator: Navigator

  @ValidateNested()
  screen: Screen

  @ValidateNested()
  window: Window

  @ValidateNested()
  document: Document

  @ValidateNested()
  canvas: Canvas

  @IsArray()
  @IsNumberString({ each: true })
  rCFP: string[]

  @IsArray()
  @IsInt({ each: true })
  fonts_optm: number[]

  @IsArray()
  @IsInt({ each: true })
  fonts: number[]

  @IsNotEmpty()
  np: number | string

  @Validate(mrValidator)
  mr: string
}
