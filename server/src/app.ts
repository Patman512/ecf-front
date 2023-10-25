import * as express from 'express';
import { middleware } from './middleware';

const app = express();
const port = 3000;

app.use(middleware);

app.get('/', (req, res) => {
    res.send(
        `Unsupported request:\nRequest method: ${req.method}\nRequest host: ${req.headers.host}\nRequest url: ${req.url}.`
    );
});

app.listen(port);
