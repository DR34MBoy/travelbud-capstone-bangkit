const express = require('express');
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// set post and listen for our requests

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`);
});