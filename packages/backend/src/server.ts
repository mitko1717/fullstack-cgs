import bodyParser from 'body-parser';
import express from 'express';
import 'dotenv/config';
import passport from 'passport';
import cors from 'cors';
import AppRouter from './routes';
import connectDB from './config/database';
import { jwtStrategy } from './middlewares/auth.middleware';

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
const router = new AppRouter(app);
// Connect to DB
connectDB();

// Express configuration
app.set('port', process.env.PORT || 4200);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// calling passport.initialize() and jwtStrategy before calling router.init()
// to ensure that middleware is initialized before handling requests

app.use(passport.initialize());
passport.use(jwtStrategy);

router.init();

const port = app.get('port');
// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

export default server;
