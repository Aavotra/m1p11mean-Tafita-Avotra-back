const config = {
    development: {
        database: {
            url: 'mongodb://localhost:27017',
            name: 'salon'
        }
    },
    test: {
        database: {
            url: 'mongodb://localhost:27017',
            name: 'salon'
        }
    },
    production: {
        database: {
            url: 'mongodb://prod_db_host:27017',
            name: 'salon'
        }
    }
};

module.exports = config[process.env.NODE_ENV || 'development'];  