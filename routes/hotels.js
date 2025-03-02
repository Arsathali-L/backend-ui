import express from 'express';
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel,countByCity, countByType, getHotelRooms } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';
import upload from "../utils/upload.js";


const router = express.Router();

//create
router.post('/',verifyAdmin, createHotel);

  
router.post("/", upload.array("photos", 10), createHotel)


//update
router.put('/:id',verifyAdmin , updateHotel);
  


//delete
router.delete('/:id',verifyAdmin, deleteHotel);

//get

router.get('/find/:id', getHotel);

//get all

router.get('/', getHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id",getHotelRooms)


  
export default router;