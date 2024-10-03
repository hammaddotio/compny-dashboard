import env from "dotenv"
env.config({ path: './.env' })

import { connect } from "mongoose"

export const connect_db = async () => {
    try {
        await connect('mongodb+srv://userfree761:CalFGdbecQpaVTpt@cluster0.fqdp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    } catch (error) {
        console.log(`DB Connection ERROR: ${error.message}`)
    }
}