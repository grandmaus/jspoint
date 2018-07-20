import openSocket from 'socket.io-client';
import ip from './ip.json';

/**
 * Shared socket
 */
const socket = openSocket(`http://${ip.ip}:5678`);

/**
 * WS subscriptions container
 * @type {Map<any, any>}
 */
const Events = new Map();

/**
 * Adds new subscription
 * @param eventName
 * @param eventHandler
 */
const registerWebSocketSubscription = (eventName, eventHandler) => {
  Events.set(eventName, eventHandler);
  socket.on(eventName, eventData => {
    Events.get(eventName)(eventData);
  });
};

const emit = (type, data) => socket.emit('message', { type, data });

export default socket;
export { registerWebSocketSubscription, emit };
