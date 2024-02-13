import express from 'express';
import * as path from 'path';
import routes from '../routes/routes.js';
import * as engines from 'consolidate';
import config from './db.config.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

config;

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('views', __dirname + '../views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, '../styles')));

app.use("/prodimages", express.static('prodimages'));
app.use("/images", express.static('images'));
app.use("/styles", express.static('styles'));

app.use("/", routes.router);

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});