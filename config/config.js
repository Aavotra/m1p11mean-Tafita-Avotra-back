const url_connexion=process.env.MONGO_URI;
const db_name=process.env.DB_NAME;

const config = {
    development: {
        database: {
//             url: 'mongodb://localhost:27017/',
            url: url_connexion,
            name: db_name
        }
    },
    test: {
        database: {
//             url: 'mongodb://localhost:27017/',
            url: url_connexion,
            name: db_name
        }
    },
    production: {
        database: {
            url: url_connexion,
            name: db_name
        }
    }
};

module.exports = config[process.env.NODE_ENV || 'development'];