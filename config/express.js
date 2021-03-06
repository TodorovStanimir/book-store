const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const path = require('path');

module.exports = (app) => {
    app.use(cors({
        origin: true,
        credentials: true
    }));

    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    app.use(cookieParser());
}