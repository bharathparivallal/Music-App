const bcrypt = require('bcrypt');
const userSchema = require('./user.model');
const { generateAuthTokens } = require('../../../middleware/auth.middleware');

// User login
const loginService = async ({ body = {} }) => {
  try {
    const { email, password } = body;
    const userQuery = { email, isDeleted: false };
    const userProject = {
      _id: 1,
      password: 1,
    };
    const user = await userSchema.findOne(userQuery, userProject).lean();
    if (!user || !(password !== user.password && bcrypt.compareSync(password, user.password))) {
      return {
        statusCode: 200,
        message: 'INCORRECT EMAIL OR PASSWORD',
      };
    }
    const responseData = {
      _id: user._id,
      email,
      tokens: await generateAuthTokens({
        email: user.email,
      }),
    };
    return { statusCode: 200, message: 'WELCOME TO MUSIC APP', data: responseData };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(error);
    }
  }
};

const userSignUp = async ({ body = {} }) => {
  try {
    const { email, password } = body;
    const userQuery = {
      email: email.toLowerCase(),
    };
    const userProjection = {
      email: 1,
    };
    const userDetails = await userSchema.findOne(userQuery, userProjection);
    if (userDetails)
      return {
        statusCode: 401,
        message: 'DUPLICATE USER',
      };
    const userInsert = await userSchema.create({
      email,
      password: bcrypt.hashSync(password, 10),
    });
    if (!userInsert)
      return {
        statusCode: 400,
        message: 'FAILED TO SIGN-IN',
      };
    return { statusCode: 200, message: 'SIGNED IN SUCCESSFULLY', data: userInsert };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(error);
    }
  }
};

module.exports = {
  loginService,
  userSignUp,
};
