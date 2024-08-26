import express from 'express';
import { pageHome } from './saskaitos/pageHome.js';
import { pageAbout } from './saskaitos/pageAbout.js';
import { page404 } from './saskaitos/page404.js';

const app = express();
const port = 5019;

app.get('/', (req, res) => {
    return res.send(pageHome());
});

app.get('/about', (req, res) => {
    return res.send(pageAbout());
});

app.get('*', (req, res) => {
    return res.send(page404());
});

app.listen(port, () => {
    console.log(`Bankas veikia: http://localhost:${port}`);   
});
