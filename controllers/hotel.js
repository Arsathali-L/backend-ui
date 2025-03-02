import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import mongoose from "mongoose";
// import upload from "../utils/upload.js";

//create
export const createHotel = async (req, res, next) => {
  try {
    console.log("Request Files:", req.files); // Debugging uploaded files
    console.log("Request Body:", req.body);   // Debugging JSON data

    // Extract text data
    const { name, type, city, address, distance, title, desc, rating, rooms, cheapestPrice, featured } = req.body;

    // Handle uploaded images
    const uploadedPhotos = req.files?.map((file) => file.path) || [];

    // Handle photo URLs from request body
    const photoUrls = req.body.photos ? (Array.isArray(req.body.photos) ? req.body.photos : [req.body.photos]) : [];

    // Merge both uploaded files & URLs
    const photos = [...uploadedPhotos, ...photoUrls];

    console.log("Final Photos Array:", photos); // Debugging extracted paths

    const newHotel = new Hotel({
      name,
      type,
      city,
      address,
      distance,
      title,
      desc,
      rating,
      rooms,
      cheapestPrice,
      featured,
      photos, // Store file paths & URLs in MongoDB
    });

    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    console.error("Error in createHotel:", error);
    next(error);
  }
};





    
//update
export const updateHotel = async (req, res,next) => {
        const updateHotel = new Hotel(req.body)
        try{
            const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
            res.status(200).json(updatedHotel);
            }catch(error){
            res.status(500).json(error);
            }
        }

//delete
export const deleteHotel = async (req, res,next) => {
        const deleteHotel = new Hotel(req.body)
        try{
            await Hotel.findByIdAndDelete(req.params.id);
            res.status(200).json("Hotel has been deleted...");
            }catch(error){
              res.status(500).json(error);
            }
        }
    
//get
export const getHotel = async (req, res,next) => {
        const getHotel = new Hotel(req.body)
        try{
            const hotel = await Hotel.findById(req.params.id);
            res.status(200).json(hotel);
            }catch(error){
              res.status(500).json(error);
            }
        }
    
//get all
export const getHotels = async (req, res, next) => {
  const { min, max, limit, ...others } = req.query; // Extract min, max, and limit

  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { 
        $gt: min ? Number(min) : 1,  // Convert min to number, default to 1
        $lt: max ? Number(max) : 999 // Convert max to number, default to 999
      }
    })
    .limit(req.query.limit); // Convert limit to a number, use 0 if not provided

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};


export const countByCity = async (req,res,next)=>{
  const cities = req.query.cities.split(",")
  try{
    const list = await Promise.all(cities.map(city=>{
      return Hotel.countDocuments({city:city})
    }))
    res.status(200).json(list);
  }catch(err){
    next(err);
  }
}


export const countByType = async (req,res,next)=>{
  
  try{
    const hotelCount = await Hotel.countDocuments({type:"hostal"})
    const apartmentCount = await Hotel.countDocuments({type:"apartment"})
    const resortCount = await Hotel.countDocuments({type:"home"})
    const villaCount = await Hotel.countDocuments({type:"luxury home"})
    // const cabinCount = await Hotel.countDocuments({type:"cabin"})
  
    res.status(200).json([
      {type:"hostal",count:hotelCount},
      {type:"apartments",count:apartmentCount},
      {type:"home",count:resortCount},
      {type:"luxury home",count:villaCount},,
      // {type:"cabins",count:cabinCount},
    ]);
  }catch(err){
    next(err);
  }

}


export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
