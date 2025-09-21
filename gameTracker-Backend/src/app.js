require("dotenv").config({path:"../.env"})
const session =require("express-session");
const express=require("express")
const authMiddleware=require("./domain/users/middleware/authMiddleware");
const app=express()
const cors=require("cors")
const corsOptions = {
    origin: "http://localhost:5173", 
    credentials: true,              
  };
app.use(cors(corsOptions))
app.use(express.json())
const {getLogin}=require("./domain/users/controllers/userController")
const gamesRoutes=require("./domain/games/routes/gamesRoute")
const listRoutes = require("./domain/lists/routes/listRoute")
const reviewsRoutes=require("./domain/reviews/routes/reviewRoute")
const userRoutes=require("./domain/users/routes/userRoute")

app.use(session({
    secret: "segredo-simples",
    resave: false,
    saveUninitialized: false,
    cookie: { 
    secure: false, 
    httpOnly:true,
    sameSite:"lax" }
}));

app.post("/login", getLogin);

const PORT=process.env.PORT;
 
app.use("/gametracker",authMiddleware,gamesRoutes)
app.use("/usuarios", userRoutes)
app.use("/listas", authMiddleware, listRoutes)
app.use("/reviews", authMiddleware, reviewsRoutes)

 
app.listen(PORT,()=>{
    console.log("Servidor funcionando na porta 3000!")
})