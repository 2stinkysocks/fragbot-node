import mineflayer from 'mineflayer'
import { Limbo } from './limbo'
import axios from 'axios'
import { GuildResponse, UUIDResponse } from './types'
import { Queue } from './queue'

let bot = mineflayer.createBot({
    host: 'hypixel.net',
    username: '',
    password: ``,
    // auth: "microsoft", // uncomment if using a migrated account
    hideErrors: true
})
let limbo = new Limbo(bot);
let queue = new Queue(bot, 5);
let ready: boolean = false
let key: string

const guildID: string = '61ecb9778ea8c9e2035c54a1'


bot.on("login", () => {
    console.log('Logged in')
    bot.chat('/api new')
    limbo.startSpam()
})

bot.on("messagestr", message => {
    console.log(message)
    if(message == 'You were spawned in Limbo.') {
        console.log('Sent to limbo: Bot is ready')
        limbo.stopSpam()
        ready = true
    } else if(message.startsWith("Your new API key is ")) {
        key = message.replace('Your new API key is ', '')
        console.log('Obtained API key')
    } else if(ready) {
        if(message.match(/-----------------------------\n(?:\[[a-zA-Z+]+\] *)?(.+) has/)) {
            let name: string = message.replace(/-----------------------------\n(?:\[[a-zA-Z+]+\] *)?/, '').match(/[^ ]+/)[0]
            axios.get(`https://api.mojang.com/users/profiles/minecraft/${name}`).then(nameRes => {
                let uuiddata: UUIDResponse = nameRes.data
                let UUID: string = uuiddata.id
                axios.get(`https://api.hypixel.net/guild?player=${UUID}&key=${key}`).then(res => {
                    let data: GuildResponse = res.data
                    if(data.guild._id == null) return console.log("Error: _id == null\n\n" + data)
                    if(data.guild._id == guildID) {
                        queue.add(name)
                    }
                }).catch(error => {
                    console.log(error)
                })
            }).catch(error => {
                console.log(error)
            })
        }
    }
})
