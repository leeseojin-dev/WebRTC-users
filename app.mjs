import express from "express"
import { config } from "./config.mjs"
import { connectDB } from "./db/user_database.mjs"

const app = express()

app.use(express.json())

connectDB().then(() => {
    app.listen(config.host.port, () => {
        console.log("WebRTC 과제 DB/웹 서버 실행 중 ...")
    })
}).catch((err) => { 
    console.error("서버 연결 실패: ", err)
})
