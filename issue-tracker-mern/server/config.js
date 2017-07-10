const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://bitmaster:Testing01@ds035026.mlab.com:35026/bit',
  port: process.env.PORT || 8000,
  secret: "adam",
  MAIL_HOST : "mailtrap.io",
  MAIL_PORT : 2525,
  MAIL_PASS : 'a925f5eea2793b',
  MAIL_USER : 'ae05935cc48cbc'

};

export default config;
