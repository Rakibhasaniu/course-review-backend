import { ErrorRequestHandler } from 'express'

import { AppError } from '../errors/AppError'
import { TErrorSources } from '../interface/error'
import { ZodError } from 'zod'
import { config } from '../config'
import handleZodError from '../errors/zodErrorHandler'
import mongooseErrorHandler from '../errors/MongooseErrorHandler'

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let message = 'something went Wrong'
  let errorMessage = 'something went Wrong'
  let statusCode = 500

  let errorSources:TErrorSources = [
    {
      path:'',
      message:'something went Wrong',
    }
  ]

  if (err instanceof ZodError) {
    const simplifiedError=handleZodError(err);
    statusCode=simplifiedError?.statusCode;
    message=simplifiedError?.message;
    errorSources=simplifiedError?.errorSources
  
  } else if (err.name === 'ValidationError') {
    const simplifiedError= mongooseErrorHandler(err)
    statusCode=simplifiedError?.statusCode;
    message=simplifiedError?.message;
    errorSources=simplifiedError?.errorSources
  }
  // else if (err?.name === 'CastError') {
  //   statusCode = 400
  //   message = 'Invalid ID!'
  //   errorMessage = CastErrorMessageGenerator(err)
  // } else if (err?.code === 11000) {
  //   statusCode = 400
  //   message = 'Duplicate Entry!'
  //   errorMessage = DuplicateErrorMessageGenerator(err)
  // } else if (err instanceof AppError) {
  //   statusCode = err.statusCode
  //   message = 'BAD REQUEST!'
  //   errorMessage = err.message
  // } else if (err instanceof Error) {
  //   message = 'Something Went Wrong!'
  //   errorMessage = err.message
  // }

  return res.status(statusCode).json({
    success: false,
    message:err?.message,
    errorSources,
    stack:config.node_env ==='development' ?  err?.stack : null
  })
}

export default globalErrorHandler
