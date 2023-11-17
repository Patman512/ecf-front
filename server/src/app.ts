import * as express from 'express';
import * as fileUpload from 'express-fileupload';
import { middleware } from './middleware';
import { createUser } from './modules/accounts';
import { addCarOffer } from './modules/carOffers';
import { editOpeningHours } from './modules/openingHours';
import { addService, editService, removeService } from './modules/services';
import { getBackofficeHomePageData, getWebAppHomePageData, sendEmail, submitRating } from './modules/webApp';
import { uploadFiles } from './modules/images';
import { approveRating } from './modules/ratings';

const app = express();
const port = 3003;

app.use(express.json());
app.use(middleware);

// Endpoint that provides all the data required to display the web app's home page
app.post('/getwebapphomepagedata', (_req, res, next) => {
    getWebAppHomePageData((error, homePageData) => {
        if (error) {
            return next(error);
        }

        if (homePageData) {
            return res.status(200).send(homePageData);
        }

        return res.status(500).send('Unexpected server error.');
    });
});

// Endpoint that provides all the data required to display the backoffice's home page
app.post('/getbackofficehomepagedata', (_req, res, next) => {
    getBackofficeHomePageData((error, homePageData) => {
        if (error) {
            return next(error);
        }

        if (homePageData) {
            return res.status(200).send(homePageData);
        }

        return res.status(500).send('Unexpected server error.');
    });
});

// Endpoint that sends an email to all employees when a visitor uses the contact form
app.post('/sendemailfromcontactform', (req, res, next) => {
    sendEmail(req.body, (error) => {
        if (error) {
            return next(error);
        }

        return res.status(200).send('OK');
    });
});

// Endpoint that submits a rating
app.post('/submitrating', (req, res, next) => {
    submitRating(req.body, (error, result) => {
        if (error) {
            return next(error);
        }

        if (result) {
            return res.status(200).send('OK');
        }

        return res.status(500).send('Unexpected server error.');
    });
});

// Endpoint that approves a rating
app.post('/approverating', (req, res, next) => {
    const params = { ...req.body, approverId: res.locals.authorId };

    approveRating(params, (error, result) => {
        if (error) {
            return next(error);
        }

        if (result) {
            return res.status(200).send('OK');
        }

        return res.status(500).send('Unexpected server error.');
    });
});

// Endpoint that creates a new user account
app.post('/createaccount', (req, res, next) => {
    createUser(req.body, (error, result) => {
        if (error) {
            return next(error);
        }

        if (result) {
            return res.status(200).send('OK');
        }

        return res.status(500).send('Unexpected server error.');
    });
});

// Endpoint that adds a new service
app.post('/addservice', (req, res, next) => {
    addService(req.body, (error, result) => {
        if (error) {
            return next(error);
        }

        if (result) {
            return res.status(200).send('OK');
        }

        return res.status(500).send('Unexpected server error.');
    });
});

// Endpoint that edits an existing service
app.post('/editservice', (req, res, next) => {
    editService(req.body, (error, result) => {
        if (error) {
            return next(error);
        }

        if (result) {
            return res.status(200).send('OK');
        }

        return res.status(500).send('Unexpected server error.');
    });
});

// Endpoint that removes an existing service
app.post('/removeservice', (req, res, next) => {
    removeService(req.body, (error, result) => {
        if (error) {
            return next(error);
        }

        if (result) {
            return res.status(200).send('OK');
        }

        return res.status(500).send('Unexpected server error.');
    });
});

// Endpoint that updates the opening hours
app.post('/editopeninghours', (req, res, next) => {
    editOpeningHours(req.body, (error, result) => {
        if (error) {
            return next(error);
        }

        if (result) {
            return res.status(200).send('OK');
        }

        return res.status(500).send('Unexpected server error.');
    });
});

// Endpoint that adds a new car offer
app.post('/addcaroffer', (req, res, next) => {
    const params = { ...req.body, authorId: res.locals.authorId };

    addCarOffer(params, (error, carOfferId) => {
        if (error) {
            return next(error);
        }

        if (carOfferId) {
            return res.status(200).send({ carOfferId });
        }

        return res.status(500).send('Unexpected server error.');
    });
});

// Endpoint that uploads images for car offers
app.post('/uploadfiles', fileUpload({ createParentPath: true }), (req, res, next) => {
    uploadFiles({ data: req.body, files: req.files }, (error) => {
        if (error) {
            return next(error);
        }

        return res.status(200).send('OK');
    });
});

app.listen(port);
