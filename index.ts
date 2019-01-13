// @format
import {config} from 'dotenv';
import {Maybe} from 'tsmonad';
import App from './src/App';

config();

App.run({
  port: Number(process.env.PORT),
  jwt_secret: Maybe.maybe<string>(process.env.JWT_SECRET),
});
