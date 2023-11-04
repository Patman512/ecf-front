import * as express from 'express';
import { getWebAppHomePageData } from './modules/webApp';

const app = express();
const port = 3000;

//app.use(middleware);

// Endpoint that provides all the data required to display the web app's home page
app.get('/getwebapphomepagedata', (_req, res, next) => {
    getWebAppHomePageData((error, homePageData) => {
        if (error) {
            return next(error);
        }

        return res.send(homePageData);
    });
});

app.listen(port);
