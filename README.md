# 💛jspoint

MiniQ presentation tool with the power of JS 👑.

💩 all of the code was basically written in 2 days and requires heavy refactoring 💩

## Requirements

- nodejs
- In order for chatbot to work you going to need an instance of **redis**.
- put your bot token in `src/config.js`.

## Running

- `npm install`
- `node src/ws-server.js`
- `npm start`
- Your presentation will open automatically on `localhost:3000`
- You can access the presenter view by visiting `localhost:3000/master`;
- You can access the phone admin panel by visiting `*your_local_network*:3000/admin` and swipe left and right. The QR code will be accessible at the presenter view (`/master`). Also your local ip will be shown when you run `npm start`.
- You can modify the slides by editing `src/web-apis.json`

## Known issues

Startup syncing is bit off right now, so in order to sync all of your slides between all instances just switch slides on main endpoint (`localhost:3000`) and websocket will publish this update to `master` and `admin`.

## Roadmap

Guys, thank you for you amazing feedback during Q&A session. I've decided to put up a little backlog of things that might be interesting to implement in the future:

- Async mode (follow the presenter or browse slides by yourself)
- REPL on slides (to do livecoding right on the slides / also the audience can play with code on their local versions of the slides. Relates to Async mode)
- Color blindness mode / Improved accessibility
