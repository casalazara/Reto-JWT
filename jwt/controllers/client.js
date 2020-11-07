const { mongoUtils, dataBase } = require('../lib/utils/mongo');
const COLLECTION_NAME = 'users';
const bcrypt = require('bcrypt');
const mw = require('../lib/utils/auth');
const saltRounds = 10;

async function getUsers() {
  const client = await mongoUtils.conn();
  const users = await client
    .db(dataBase)
    .collection(COLLECTION_NAME)
    .find({})
    .toArray()
    .finally(() => client.close());
  return users;
}

async function login(user) {
    return mongoUtils.conn().then(async (client) => {
        const requestedUser = await client
            .db(dataBase)
            .collection(COLLECTION_NAME)
            .findOne({name: user.name})
            .finally(() => client.close());
        const isValid = await bcrypt.compare(user.password, requestedUser.password);
        let currentUser = {...requestedUser};
        if(isValid){
            delete currentUser.password;
            let token = mw.createToken(currentUser);
            currentUser.token = token;
            return currentUser;
        } else {
            throw new Error('Authetication failed');
        }
    });
}

async function createUser(user) {
    if(user.password){
        user.password = await bcrypt.hash(user.password, saltRounds);
    }
    return mongoUtils.conn().then(async (client) => {
        const newUser = await client
            .db(dataBase)
            .collection(COLLECTION_NAME)
            .insertOne(user)
            .finally(() => client.close());

        newUser && newUser.ops ? delete newUser.ops[0].password: newUser;
        return newUser.ops[0];
    });
}

module.exports = [createUser, login, getUsers];