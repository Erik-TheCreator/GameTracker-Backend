const express=require("express")
const router=express.Router()
const gamesController=require("../controllers/gamesController")

router.get("/",gamesController.getAll)
router.get("/filter", gamesController.getFiltered); 
router.get("/:id", gamesController.getById);

module.exports=router