export default () => ({
  secret: {
    JwtService: process.env.SECRET_KEY,
  },
  database: {
    mongodb: process.env.MONGODB_URI,
  },
  port: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
});
