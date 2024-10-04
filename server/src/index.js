import env from "dotenv"
env.config({ path: './.env' })

import express from "express"
import { connect_db } from "./db/index.js"
import cors from 'cors'

export const app = express()

const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || '0.0.0.0'

connect_db()
    .then(() => console.log("DB Connected"))
    .catch((error) => console.log(error))

app.use(express.json())
app.use(cors(
    {
        origin: '*',
    }
))

import { auth_router } from "./routes/auth.routes.js"
import { user_router } from "./routes/user.routes.js"
import { payment_router } from "./routes/payment.routes.js"
import { services_router } from "./routes/services.routes.js"
import { ticket_router } from "./routes/ticket.routes.js"
// import { subscription_route } from "./routes/subscription.routes.js"

app.use(auth_router)
app.use(user_router)
app.use(payment_router)
// app.use(subscription_route)
app.use(services_router)
app.use(ticket_router)


app.listen(PORT, HOST, () => console.log(`Server listening on port ${PORT} `))