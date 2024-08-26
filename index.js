import express from 'express';

const app = express();
const port = 5019;

app.listen(port, () => {
    console.log(`Bankas veikia: http://localhost:${port}`);   
});