if (!process.env.TOKEN_SECRET) {
  console.warn('TOKEN_SECRET not passed. Using a default value.')
}
const jtwSecret = process.env.TOKEN_SECRET || 'G3nericS3cretValue'

module.exports = {
  jwtSecret: jtwSecret,
}
