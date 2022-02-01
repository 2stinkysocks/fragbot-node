import { Bot } from "mineflayer";

export class Queue {

    queue: string[]
    bot: Bot
    seconds: number
    override: boolean

    constructor(bot: Bot, seconds: number) {
        this.queue = []
        this.override = false
        this.bot = bot
        this.seconds = seconds
        setInterval(() => {
            console.log(this.queue)
            if(!this.override) {
                this.bot.chat(`/p leave`)
                if(this.queue != undefined && this.queue.length != 0) {
                    console.log(`/p accept ${this.queue[0]}`)
                    setTimeout(() => this.bot.chat(`/p accept ${this.queue[0]}`), 1500)
                    this.queue.shift()
                }
            }
        }, seconds * 1000)
    }

    add(player: string) {
        if(this.queue.indexOf(player) == -1) {
            if(this.queue.length == 0) {
                this.override = true
                this.queue.push(player)
                this.bot.chat(`/p accept ${player}`)
                setTimeout(() => {
                    this.bot.chat(`/p leave`)
                    this.queue.shift()
                    this.override = false
                }, this.seconds*1000)
            } else {
                console.log(this.queue)
                this.queue.push(player)
            }
        }
        console.log(this.queue)
    }
    
}