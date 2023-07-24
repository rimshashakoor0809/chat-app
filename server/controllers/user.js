const User = require('../models/UserModel');
const bcryptjs = require('bcryptjs');
const ErrorHandler = require('../utils/ErrorHandler');
const sequelize = require('../connect');
const { generateToken } = require('../utils/TokenHandler');
const { Op } = require('sequelize');

// joi 

exports.signUpUser = async (req, res, next) => {
  try {

    console.log('User model:', User)
    const { name, email, password } = req.body;

    if (!name || !email || !password) {

      return next(ErrorHandler({ status: 400, message: 'Please fill in all the required fields.' }));
    }
    if (password.length < 8) {
      return next(ErrorHandler({ status: 400, message: 'Password must contain at least 8 characters' }));
    }


    // check if user exists
    const isExist = await User.findOne({ where: { email } });

    if (isExist) return next(ErrorHandler({ status: 400, message: 'This email already exists.' }));

    // Hash Password
    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // create new one
    const newUser = await User.create({
      username: name,
      email,
      password: hashedPassword
    });


    res.status(200).json(newUser);

  } catch (err) {

    console.log(`Error❤️‍🔥: ${err}`);
    return next(ErrorHandler({ status: 400, message: 'Failed to register new account😞.' }));
  }
}

exports.login = async (req, res, next) => {

  try {

    const { email, password } = req.body;

    // Validation 

    if (!email || !password) {

      return next(ErrorHandler({ status: 400, message: 'Please fill in all the required fields.' }));
    }


    // check if user exists
    const user = await User.findOne({ where: { email } });

    if (!user) {

      return next(ErrorHandler({ status: 404, message: 'No User found😊' }));
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return next(ErrorHandler({ status: 400, message: 'Incorrect Password. Try Again😥' }));
    }

    const payload = {
      id: user.user_id,
      name: user.username,
      email: user.email,
      status: user.status
    }

    // generate access token with 15-minute expiry
    const accessToken = generateToken(payload, '15min', process.env.JWT_SECRET);


    // generate refresh token with a longer expiry (e.g., 7 days)
    const refreshToken = generateToken(payload, '7d', process.env.JWT_SECRET_REFRESH);

    // Update the user's status to true
    user.status = true;
    await user.save();

    const combinedTokens = `${accessToken}|${refreshToken}`;


    res.cookie('authTokens', combinedTokens, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), //1d
      sameSite: 'none',
      secure: true
    });

    res.status(200).json({
      user,
      accessToken,
      refreshToken,
    });

  }
  catch (err) {
    console.log(`Error:  ${err}\n Error Message: ${err.message}`);

    return next(ErrorHandler({ status: 500, message: 'Server Error: Something went wrong, try again😥' }));
  }
}



exports.getUserWithID = async (req, res, next) => {
  try {

    const { id } = req.params;
    const user = await User.findByPk(id)

    // check if user exists
    if (!user) {
      return next(ErrorHandler({ status: 404, message: 'No User found😊' }));
    }

    res.status(200).json({
      user
    });

  }
  catch (err) {
    console.log(`Error:  ${err}\n Error Message: ${err.message}`);

    return next(ErrorHandler({ status: 500, message: 'Server Error: Something went wrong, try again😥' }));
  }
}


exports.getUsersList = async (req, res, next) => {
  try {

    console.log('User data', req.user);


    // const users = await User.findAll();
    const users = await User.findAll({
      where: {
        user_id: {
          [Op.ne]: req.user.id
        },
      },
    });


    // check if user exists
    if (!users || users.length === 0) {
      return next(ErrorHandler({ status: 404, message: 'No users found.' }));
    }

    res.status(200).json({
      userInfo: req.user,
      users
    });




  }
  catch (err) {
    console.log(`Error:  ${err}\n Error Message: ${err.message}`);

    return next(ErrorHandler({ status: 500, message: 'Server Error: Something went wrong, try again😥' }));
  }
}



exports.updateStatus = async (req, res, next) => {
  try {

    console.log('User data', req.user);

    const { data } = req.body;



    const updatedUser = await User.update(
      { status: req.body.newStatus },
      { where: { user_id: req.user.id } }
    );

    res.status(200).json({ message: 'Updated Successfully' })


  }
  catch (err) {
    console.log(`Error:  ${err}\n Error Message: ${err.message}`);

    return next(ErrorHandler({ status: 500, message: 'Server Error: Something went wrong, try again😥' }));
  }
}


exports.logout = async (req, res, next) => {

  try {

    // Update the user's status to false (assuming 'status' represents the user's login status)
    console.log('user check64837', req.user.id);
    const user = await User.findOne({ where: { user_id: req.user.id } });
    user.status = false;
    await user.save();

    if (!user) {
      next(ErrorHandler({ status: 400, message: 'user does not exists😥' }));
    }

    res.cookie('authTokens', null, {
      httpOnly: true,
      expires: new Date(0),
      sameSite: 'none',
      secure: true
    });

    res.status(200).json({
      message: 'Logout Successfully'
    });

  }
  catch (err) {
    console.log(`Error:  ${err}\n Error Message: ${err.message}`);

    return next(ErrorHandler({ status: 500, message: 'Server Error: Something went wrong, try again😥' }));
  }
}

