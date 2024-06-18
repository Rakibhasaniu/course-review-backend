import { ErrorRequestHandler } from 'express'

import { AppError } from '../errors/AppError'
import { TErrorSources } from '../interface/error'
import { ZodError } from 'zod'
import { config } from '../config'
import mongooseErrorHandler from '../errors/MongooseErrorHandler'
import handleZodError from '../errors/ZodErrorHandler'
import CastErrorHandler from '../errors/CastErrorHandler'
import handleDuplicateError from '../errors/DuplicateErrorHandler'

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let message = 'something went Wrong'
  let errorMessage = 'something went Wrong'
  let statusCode = 500

  let errorSources:TErrorSources = [
    {
      path:'',
      message:err?.message,
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
  else if (err?.name === 'CastError') {
    const simplifiedError= CastErrorHandler(err)
    statusCode=simplifiedError?.statusCode;
    message=simplifiedError?.message;
    errorSources=simplifiedError?.errorSources
  } 
  else if (err?.code === 11000) {
    const simplifiedError= handleDuplicateError(err)
    statusCode=simplifiedError?.statusCode;
    message=simplifiedError?.message;
    errorSources=simplifiedError?.errorSources
    
  }
  else if (err instanceof AppError) {
    statusCode = err.statusCode
    message = 'BAD REQUEST!'
    errorMessage = err.message
  } 
  else if (err instanceof Error) {
    message = 'Something Went Wrong!'
    errorMessage = err.message
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack:config.node_env ==='development' ?  err?.stack : null
  })
}

export default globalErrorHandler
