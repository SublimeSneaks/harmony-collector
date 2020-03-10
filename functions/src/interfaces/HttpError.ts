export class HttpError {
  constructor(
    public code:
      | 'ok'
      | 'cancelled'
      | 'unknown'
      | 'invalid-argument'
      | 'deadline-exceeded'
      | 'not-found'
      | 'already-exists'
      | 'permission-denied'
      | 'resource-exhausted'
      | 'failed-precondition'
      | 'aborted'
      | 'out-of-range'
      | 'unimplemented'
      | 'internal'
      | 'unavailable'
      | 'data-loss'
      | 'unauthenticated',
    public message: string
  ) {}
}
