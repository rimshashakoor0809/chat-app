const { Op, literal } = require('sequelize');
const Message = require('../models/MessageModel');
const ErrorHandler = require('../utils/ErrorHandler')

exports.sendMessage = async (req, res, next) => {

  try {

    // console.log('Req body', req.body);
    const { receiver, message } = req.body;

    const sender = req.user.id;

    // console.log('user:', req.user);

    // create new message
    const newMsg = await Message.create({
      sender_id: sender,
      receiver_id: receiver,
      users: [sender,parseInt(receiver)],
      message: message
    });


    if (newMsg) res.status(200).json({ message: 'Message Stored to Database' })

    res.status(400).json({ message: ' Failed to Stored to Database' })

  } catch (error) {

    console.log(`Error❤️‍🔥: ${error}`);
    return next(ErrorHandler({ status: 400, message: 'Failed to add new message😞.' }));

  }


}

exports.fetchAllMessages = async (req, res, next) => {

  try {

    const { receiverId } = req.params;

    console.log('Req params:', req.params);

    // const sender = req.user.id;
    const sender = 1;
    // Fetch all messages that match the senderId and receiverId
    const messages = await Message.findAll({
      where: literal(`JSON_CONTAINS(users, '[${sender}]') AND JSON_CONTAINS(users, '[${receiverId}]')`),
      order: [['createdAt', 'ASC']],
    });

  

    res.status(200).json(messages);




  } catch (error) {

    console.log(`Error❤️‍🔥: ${error}`);
    return next(ErrorHandler({ status: 400, message: 'Failed to get all messages😞.' }));

  }


}