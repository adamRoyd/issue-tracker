const config = {
  //Prod
  mongoURL: process.env.MONGO_URL || 'mongodb://bituser:eWpuW2+fF5@localhost:27017/bit',
  //Dev
  //mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mern-starter',
  port: process.env.PORT || 8000,
  secret: "adam",
  MAIL_HOST : "mailtrap.io",
  MAIL_PORT : 2525,
  MAIL_PASS : '4f9796b1f8a6d4',
  MAIL_USER : '5dbabf19308f71'
};

export default config;