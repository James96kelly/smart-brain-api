import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

import {handleSignin} from './controllers/signin.js';
import {handleRegister} from './controllers/register.js';
import {handleProfileGet} from './controllers/profile.js';
import {handleImage} from './controllers/image.js';
import {handleApiCall} from './controllers/image.js';

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    //host : process.env.DATABASE_URL,
    //host : 'postgresql-flat-15219',
    //host : '127.0.0.1',
    // user : 'postgres',
    // password : 'test',
    // database : 'smart-brain'
    ssl: true,
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send("it's working");});
app.post('/signin', handleSignin(db,bcrypt));
app.post('/register' , (req,res) => { handleRegister(req, res, db, bcrypt);});
app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db);});
app.put('/image', (req, res) => { handleImage(req, res, db);});
app.post('/imageurl', (req, res) => { handleApiCall(req, res);});

// app.listen(3000, ()=> {
// 	console.log('app is running on port 3000');
// })

app.listen(process.env.PORT || 3000, () => {
console.log(`app is running on port ${process.env.PORT}`);
});