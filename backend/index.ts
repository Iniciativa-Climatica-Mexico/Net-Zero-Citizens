import DotEnv from 'dotenv'
DotEnv.config()

import express from 'express'
import {
  TypedRequest,
  TypedResponse,
  NoQueryParams,
  NoBody,
} from './src/utils/RequestResponse'

const app = express()

// Endpoint de ejemplo
app.get(
  '/dummy',
  (
    req: TypedRequest<
      { name: string }, // Query Params type (Si no hay Query Params usar NoQueryParams)
      NoBody // Body type (Si no hay Body usar NoBody)
    >,
    res: TypedResponse<{ greeting: string }> // Response type
  ) => {
    req.body.name
    res.json({ greeting: 'Hello World!' + req.body.name })
  }
)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
