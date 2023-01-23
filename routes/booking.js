import express from "express";
import { bookhotel,
     getBookingdata,
     deleteBooking,  
     getHote,
     getInfo,
     deleteInfo} 
     from "../controllers/booking.js";
import { verifyAdmin } from "../utils/verifyToken.js";


const router = express.Router();


router.post("/", bookhotel);
router.get("/",  getBookingdata);
router.get("/a",  getHote);
router.get("/g",  getInfo);
router.delete("/:id",  deleteBooking);
router.delete("/",  deleteInfo);





export default router;
