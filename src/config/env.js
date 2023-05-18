import 'dotenv/config';

export default {
    DB_URL: process.env.MONGODB_URL,
    app_env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 9000,
    salt_rounds: parseInt(process.env.salt_rounds, 10) || 10,
    jwt_secret: process.env.JWT_SECRET,
    passwordExpiresIn: process.env.PASSWORD_EXPIRES_IN || '1day',
    domain_email: process.env.DOMAIN_EMAIL,
    domain_password: process.env.DOMAIN_PASSWORD,
    protocol: process.env.PROTOCOL,
    redis_url: process.env.REDIS_URL,
    domain: process.env.DOMAIN,
    // IMAGEKIT_ENV: process.env.IMAGEKIT_ENV,
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT,
    IMAGEKIT_APP_FOLDER: process.env.IMAGEKIT_APP_FOLDER,
  };
  