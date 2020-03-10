import 'express-async-errors'

import * as functions from 'firebase-functions'

import { NextFunction, Request, Response } from 'express'

import { Base64 } from 'js-base64'
import { BrowserData } from './data/BrowserData'
import { BrowserEntity } from './entities/Browser'
import { BrowserPayload } from './data/BrowserPayload'
import { ErrorBody } from './interfaces/ErrorBody.interface'
import { EventData } from './data/EventData'
import { EventEntity } from './entities/Event'
import { EventPayload } from './data/EventPayload'
import { HttpError } from './interfaces/HttpError'
import { RawBody } from './interfaces/RawBody.interface'
import { RequestEntity } from './entities/Request'
import { TimestampEntity } from './entities/Timestamp'
import { ValidationError } from 'class-validator'
import { classToPlain } from 'class-transformer'
import { connect } from './config'
import { transformAndValidate } from 'class-transformer-validator'
import { v3 } from 'murmurhash'

import morgan = require('morgan')

import bodyParser = require('body-parser')
import express = require('express')
import cors = require('cors')

const app = express()
const connection = connect()

// Automatically allow cross-origin requests
app.use(cors({ origin: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))

const getRequestEntity = (body: RawBody, payload: BrowserPayload | EventPayload) => {
  const request = new RequestEntity()
  request.origin = payload._a.origin
  request.ts = new Date(payload._a.ts)
  request.uid = payload.uid
  request.url = body.url
  request.version = body.version

  return request
}

app.post('/', async (req: Request, res: Response<{ success: boolean }>) => {
  const rawBody: RawBody = req.body
  let payload: BrowserPayload | EventPayload

  try {
    const rawPayload = JSON.parse(Base64.decode(rawBody.payload))

    if (Array.isArray(rawPayload)) {
      throw new HttpError('invalid-argument', 'Payload is Array.')
    } else {
      if (rawPayload.from === 'browser') {
        payload = (await transformAndValidate(BrowserPayload, rawPayload)) as BrowserPayload
      } else {
        payload = (await transformAndValidate(EventPayload, rawPayload)) as EventPayload
      }
    }
  } catch (error) {
    throw new HttpError('invalid-argument', JSON.stringify(classToPlain(error)))
  }

  const conn = await connection

  if (payload.from === 'browser') {
    const browserData = await transformAndValidate(BrowserData, payload.data)
    const browserRepo = conn.getRepository<BrowserEntity>('browser')

    const hashId = v3(JSON.stringify({ ...payload.data })).toString()
    const isNew = await browserRepo.count({ id: hashId }).then(res => res === 0)

    if (isNew) {
      const request = getRequestEntity(rawBody, payload)
      const browser = new BrowserEntity()

      browser.id = hashId
      browser.browser = browserData
      browser.request = request

      await request.save()
      await browser.save()
    }
  } else {
    const eventData = await transformAndValidate(EventData, payload.data)

    const request = getRequestEntity(rawBody, payload)
    const timestamps = new TimestampEntity()
    const event = new EventEntity()

    if (payload.timestamps.length === 1) {
      timestamps.start = new Date(payload.timestamps[0][0])
    } else if (payload.timestamps.length == 2) {
      timestamps.start = new Date(payload.timestamps[0][0])
      timestamps.listeners = null
      timestamps.event = new Date(payload.timestamps[1][0])
    } else if (payload.timestamps.length >= 3) {
      timestamps.start = new Date(payload.timestamps[0][0])
      timestamps.listeners = new Date(payload.timestamps[1][0])
      timestamps.event = new Date(payload.timestamps[2][0])
    }

    event.event = eventData
    event.request = request
    event.timestamps = timestamps

    await request.save()
    await timestamps.save()
    await event.save()
  }

  res.status(200).json({ success: true })
})

app.use(<T extends Error>(err: T, req: Request, res: Response<ErrorBody>, next: NextFunction) => {
  if (Array.isArray(err) && err.length > 0) err = err[0]
  if (err instanceof ValidationError) {
    res.status(400).json({ success: false, message: 'invalid-argument' })
  } else if (err instanceof HttpError) {
    res.status(400).json({ success: false, message: err.code })
  } else {
    res.status(500).json({ success: false, message: 'internal', error: err.message })
  }
})

export const collect = functions.https.onRequest(app)
