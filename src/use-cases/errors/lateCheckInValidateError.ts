export class LateCheckInValidateError extends Error {
  constructor() {
    super('The Check In  can olny be validated until 20 minutes of creation')
  }
}
