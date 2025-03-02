import express from "express"
// import { deleteUser } from "../controllers/user";
import {updateUser,deleteUser,getUser,getUsers} from "../controllers/user.js";
import {  verifyUser ,verifyAdmin} from "../utils/verifyToken.js";


const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//     res.send("Hello User logged in")
// })

// router.get ("/checkuser/:id",verifyUser, (req,res,next)=>{
//     res.send ("hello user you are login and delect your account")
// })

// router.get ("/checkadmin/:id",verifyAdmin, (req,res,next)=>{
    // res.send ("hello admin you are login and delect all account")
// })

//create
// router.post("/",createUser);

//update
router.put("/:id", verifyUser,updateUser);

//delete
router.delete("/:id",verifyUser,deleteUser);

//get
router.get("/:id", verifyUser,getUser);

//getall
router.get("/",verifyAdmin,getUsers);

export default router
