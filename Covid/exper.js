const express = require('express');
const router = express.Router();
require('dotenv').config();

/*
const app = express();

const port = 3001;

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.listen(port, () => console.log("Listening on", port));
*/

router.get('/dotenv', function(req, res, next) {
    res.send(process.env.DB_NAME);
})

module.exports = router;