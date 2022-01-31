import { Bot } from "mineflayer"

export class Limbo {

    interval: ReturnType<typeof setInterval>
    bot: Bot
    isDone: boolean

    constructor(bot: Bot) {
        this.bot = bot
        this.isDone = false
        this.interval = 0
    }

    startSpam(): void {
        if(!this.isDone) {
            this.isDone = true
            this.interval = setInterval(() => {
                console.log("Sent /")
                this.bot.chat("/")
            }, 300)
        }
    }

    stopSpam(): void {
        clearInterval(this.interval)
    }
}