import { Bot } from "mineflayer";

export interface UUIDResponse {
    name: string
    id: string
}

export interface GuildResponse {
    success: boolean
    guild: {
        _id: string
        name: string
    }
}