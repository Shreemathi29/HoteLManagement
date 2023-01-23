import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
 
  getHotels,
  
  getHotelType,
  
  updateHotel,
} from "../controllers/hotel.js";

import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();


router.post("/", verifyAdmin, createHotel);
router.put("/:id", verifyAdmin, updateHotel);
router.delete("/:id", verifyAdmin, deleteHotel);
router.get("/find", getHotel);
router.get("/find/tt", getHotelType);


router.get("/", getHotels);


router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
//router.get("/room/:id", getHotelRooms);

export default router;
