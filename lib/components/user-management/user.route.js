const express = require('express');
const route = express.Router();
const user = require('./user.controller');
const { authLoginBodySchema } = require('./user.validator');
const catchAsync = require('../../utility/catch-async');
const { validate } = require('../../utility/input-validation');

// New Login Service
route.post('/authLogin', validate(authLoginBodySchema), catchAsync(user.loginService));
route.post('/authSignUp', validate(authLoginBodySchema), catchAsync(user.userSignUp));

module.exports = route;
