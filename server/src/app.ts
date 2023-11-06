import * as express from 'express';
import { getWebAppHomePageData, sendEmail, submitRating } from './modules/webApp';

const app = express();
const port = 3000;

//app.use(middleware);
app.use(express.json());

// Endpoint that provides all the data required to display the web app's home page
app.get('/getwebapphomepagedata', (_req, res, next) => {
    getWebAppHomePageData((error, homePageData) => {
        if (error) {
            return next(error);
        }

        return res.send(homePageData);
    });
});

// Endpoint that sends an email to all employees when a visitor uses the contact form
app.post('/sendemailfromcontactform', (req, res, next) => {
    sendEmail(req.body, (error) => {
        if (error) {
            return next(error);
        }

        return res.send('Done');
    });
});

// Endpoint that submits a rating
app.post('/submitrating', (req, res, next) => {
    submitRating(req.body, (error, result) => {
        if (error) {
            return next(error);
        }

        return res.send(result ? 'Done' : 'Unexpected number of affected rows.');
    });
});

app.listen(port);
