// module.exports = (error, request, response, next) => {
//   console.error(error)

//   if (error.name === 'CastError') {
//     response.status(400).send({ error: 'id used is malformed' })
//   } else if (error.name === 'ValidationError') {
//     response.status(409).send({ error: error.message })
//   } else if (error.name === 'JsonWebTokenError') {
//     response.status(401).send({ error: 'token missing or invalid' })
//   } else {
//     response.status(500).end()
//   }
// }

const ERROR_HANDLERS = {
  CastError: res => res.status(400).send({ error: 'id used is malformed' }),
  ValidationError: (res, { message }) => res.status(409).send({ error: message }),
  JsonWebTokenError: res => res.status(401).send({ error: 'token missing or invalid' }),
  TokenExpirerError: res => res.status(401).send({ error: 'token expired' }),
  defaultError: res => res.status(500).end()
}

module.exports = (error, request, response, next) => {
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

  handler(response, error)
}
