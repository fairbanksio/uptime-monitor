if (!process.env.TOKEN_SECRET) {
  console.warn('TOKEN_SECRET not passed. Using a default value.')
}
const jtwSecret = process.env.TOKEN_SECRET || 'G3nericS3cretValue'

// you can generate these keys with openssl rand -base64 32; openssl rand -base64 64;
const encryptionSecret = process.env.ENCRYPTION_SECRET || 'ThisStr1ngShouldBeVeryLongAndNotGuessable' // must be 32 Bytes

module.exports = {
  jwtSecret: jtwSecret,
  encryptionSecret
}
