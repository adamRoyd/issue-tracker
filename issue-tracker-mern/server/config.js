const config = {
    // Prod
    mongoURL: process.env.MONGO_URL || 'mongodb://bituser:eWpuW2+fF5@localhost:27017/bit',
    // Dev
    //mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mern-starter',
    // Cloud
    // mongoURL: 'mongodb://bitmaster2:test@ds035026.mlab.com:35026/bit',
    port: process.env.PORT || 8000,
    secret: 'adam',
    MAIL_HOST: 'smtp.mailtrap.io',
    MAIL_PORT: 25,
    MAIL_PASS: 'b1cfc87c633479',
    MAIL_USER: 'e4a9c028b9c5cc',
};

export default config;
