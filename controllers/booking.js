import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";

import { createError } from "../utils/error.js";

export const bookhotel = async (req, res, next) => {
    const newBooking = new Booking(req.body);
    try {
      const savedBooking = await newBooking.save();
      try {
        const hotel = await Hotel.findOne(req.body );
        if (!hotel) return next(createError(404, "Hotel not found! or type is not found"));
        } catch (err) {
        next(err);
      }
      res.status(200).json(savedBooking);
    } catch (err) {
      next(err);
    }
  };

  export const getBookingdata = async (req, res, next) => {
    try {
     const savedBooking1 = await Booking.findOne( req.body );
      if (savedBooking1) return next(createError(404, "Oops!! Already Booked!"));
      res.status(200).json("Available to book");
    } catch (err) {
      next(err);
    }
  };  


  
export const getInfo = async(req, res) => {
    try {
        const aliens = await Booking.find()
        res.json(aliens)
    } catch (err) {
        res.send('Error' +err)
    }
}


export const deleteBooking = async (req, res, next) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json("Booking has been cancelled.");
  } catch (err) {
    next(err);
  }
};

export const deleteInfo = async(req, res) => {
    try {
        const aliens = await Booking.deleteMany()
        res.json(aliens)
    } catch (err) {
        res.send('Error' +err)
    }
}


export const bookingInfo =  async (req, res) => {
  const checkIn = new Date(req.body.checkInDate);
  const checkOut = new Date(req.body.checkOutDate);
  
 
  const checking = await Booking.find(
    {
    $or: [
      
      { checkInDate: { $gte: checkIn, $lt: checkOut } },
      { checkOutDate: { $gt: checkIn, $lte: checkOut } },
      { checkInDate: { $lt: checkIn }, checkOutDate: { $gt: checkOut } }
    ]
  });

  if (checking.length > 0) {
    res.status(409).json({ message: " existing booking" });
  } else {
    res.status(200).json({ message: "Check-in time is available" });
  }
};


