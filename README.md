# fragbot-node

A simple fragbot written in typescript

## Installation

Clone the repository

Install dependencies
```
npm i
```

Install ts-node
```
npm i ts-node -g
```

Edit `username`, `password`, `auth`, and `guildID` in `/src/index.ts`

Start the bot
```
npm start
```

If using another service to start the bot, like [forever](https://npmjs.com/package/forever), run the bot using the full command.

Example:
```
forever start -c ts-node src/index.ts
```
