const config = {
    development: {
        database: {
            url: 'mongodb://localhost:27017/',
            name: 'salon'
        }
    },
    test: {
        database: {
            url: 'mongodb://localhost:27017/',
            name: 'salon'
        }
    },
    production: {
        database: {
            url: 'mongodb+srv://root:root@cluster0.hatvqdw.mongodb.net/exam_salon',
            name: 'exam_salon'
        }
    }
};

module.exports = config[process.env.NODE_ENV || 'development'];
