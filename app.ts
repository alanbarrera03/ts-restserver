import dotenv from 'dotenv';
import Server from './models/server';

// configured dot.env
dotenv.config();

const server = new Server();

server.listen();

// export const name =  'Alan';

// console.log(name);