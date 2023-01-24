import express from "express";
import { bookhotel,
     getBookingdata,
     deleteBooking,  
     getInfo,
     deleteInfo,
     bookingInfo} 
     from "../controllers/booking.js";
import { verifyAdmin } from "../utils/verifyToken.js";


const router = express.Router();

router.get("/check-availability", bookingInfo)
router.post("/", bookhotel);
router.get("/",  getBookingdata);
router.get("/get",  getInfo);
router.delete("/:id",  deleteBooking);
router.delete("/", verifyAdmin, deleteInfo);





export default router;
