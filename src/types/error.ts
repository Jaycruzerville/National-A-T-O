export interface IError {
  response: {
    data: {
      message: string
      error: string
      errors: {
        error: string
      }[]
    }

    status: number
  }
  message: string
}
