import {Client} from 'pg';

const client = new Client({
    host : "localhost",
    user : "postgres",
    port : 5432,
    password : "postgres",
    database : "JWT"
});

client.connect();

export default client;