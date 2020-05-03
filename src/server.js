import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';
import session from 'express-session';

require('dotenv').config();
let mongoose = require('mongoose');

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`, {useUnifiedTopology: true, useNewUrlParser: true});

express()
	.use(session({ 
		secret: process.env.SESSION_SECRET,
		resave: false,
		secure: true,
		saveUninitialized: false,
		unset: 'destroy'
	}))
	.use(bodyParser.json())
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: req => ({
				token: req.session.token
			})
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});