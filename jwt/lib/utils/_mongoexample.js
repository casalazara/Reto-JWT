const mongoClient = require('mongodb').MongoClient;
const uri = process.env.DB_HOST;
const dataBase = process.env.DB_NAME;

function mongoUtils() {
  const mu = {};
  // Esta variable almacenará la conexión a MongoDB.
  // Tenga presente que es una promesa que deberá ser resuelta.
  mu.conn = mongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
    keepAlive: 1,
    auto_reconnect: true,
  });
  return mu;
}

exports.mongoUtils = mongoUtils();
exports.dataBase = dataBase;