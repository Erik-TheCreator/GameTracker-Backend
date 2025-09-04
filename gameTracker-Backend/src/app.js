require("dotenv").config({path:"../.env"})
const express=require("express")
const app=express()
const cors=require("cors")
app.use(cors())
app.use(express.json())
const gamesRoutes=require("./domain/games/routes/gamesRoute")
const PORT=process.env.PORT;
 
app.use("/gametracker",gamesRoutes)
 
app.listen(PORT,()=>{
    console.log("Servidor funcionando na porta 3000!")
})