const TelegramBot = require('node-telegram-bot-api');
const { botToken } = require('./config');
const openSocket = require('socket.io-client');
const getIp = require('./utils/ip');
const {
  getUserCommandsAvailability,
  allowUsersToControlPresentation
} = require('./utils/memoryDB');
const { appendFile } = require('fs');

const socket = openSocket(`http://${getIp()}:5678`);
const emit = (type, data) => socket.emit('message', { type, data });

const bot = new TelegramBot(botToken, { polling: true });

const commands = ['/next', '/previous', '/editor', '/camera'];

bot.on('message', msg => {
  const chatId = msg.chat.id;
  const isCommand = commands.includes(msg.text);

  if (msg.text === '117117117') {
    allowUsersToControlPresentation();
    return;
  }

  if (msg.text === '/start') {
    bot.sendMessage(
      chatId,
      `*Welcome to the MiniQ WebAPI chat bot!*\n \nYou can type your questions and send them to the speaker
       \nPlease, participate at our demo at the end of the talk by following instructions provided by the speaker
       \nHave a good time!`,
      { parse_mode: 'Markdown' }
    );
    return;
  }

  if (isCommand) {
    console.log('[TELEGRAM] - new command', msg.text);
    getUserCommandsAvailability().then(res => {
      console.log('[TELEGRAM] - USER ACCESS AVAILABILITY', res);
      if (res) {
        bot.sendMessage(
          chatId,
          'This command is disabled right now, please, try again when demo starts'
        );
      } else {
        if (msg.text === commands[0]) {
          emit('next');
        } else if (msg.text === '/editor') {
          emit('editor');
        } else if (msg.text === '/camera') {
          emit('camera');
        } else emit('previous');
      }
    });
  } else {
    console.log(msg);
    emit('chatbot_message', `${msg.from.username} - ${msg.text}`);
    bot.sendMessage(chatId, 'Thank you for your question');
    appendFile('questions.txt', `${msg.text}`, e => {
      if (e) throw e;
      console.log('written new question');
    });
  }
});
