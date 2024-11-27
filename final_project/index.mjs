import express from 'express';
import session from 'express-session';
import {authenticated_users_router} from './router/auth_users.mjs';
import {general_router} from './router/general.mjs';

const app = express();

app.use(express.json());

app.use("/customer", session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
}));

app.use("/customer/auth/*", function auth(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({message: "Unauthorized access"});
    }
});

const port = 5000;

app.use("/customer", authenticated_users_router);
app.use("/", general_router);

app.listen(port, () => console.log("Server is running"));