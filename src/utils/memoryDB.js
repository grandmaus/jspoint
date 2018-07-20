const redis = require('redis'),
  client = redis.createClient();

const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);

const AUDIENCE_CONTROL = 'ENABLE_AUDIENCE_CONTROL';
const DEFAULT_AUDIENCE_CONTROL_LEVEL = 'NOT_ALLOWED';

client.set(AUDIENCE_CONTROL, 'NOT_ALLOWED', () => {
  console.log('[REDIS] - SET DEFAULT USER ACCESS LEVEL');
});

function getUserCommandsAvailability() {
  return getAsync(AUDIENCE_CONTROL).then(res => {
    console.log('[REDIS] - check for control', res === DEFAULT_AUDIENCE_CONTROL_LEVEL);
    return res === DEFAULT_AUDIENCE_CONTROL_LEVEL;
  });
}

function allowUsersToControlPresentation() {
  client.set(AUDIENCE_CONTROL, 'ALLOWED', () => {
    console.log('[REDIS] - ENABLE USER ACCESS');
  });
}

module.exports = {
  getUserCommandsAvailability,
  DEFAULT_AUDIENCE_CONTROL_LEVEL,
  allowUsersToControlPresentation
};
