import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { createError } from "../utils/error.js";

export const bookhotel = async (req, res, next) => {
    
    const newBooking = new Booking(req.body);
  
    try {
      const savedBooking = await newBooking.save();
      try {

        //await Hotel.find(hotelId);
        const hotel = await Hotel.findOne(req.body );

        if (!hotel) return next(createError(404, "Hotel not found! or type is not found"));
        // const newBooking = await Booking.findOne(req.body );
        // if (!newBooking) return next(createError(409, "Hotel not found! "));


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

      
      res.status(200).json(savedBooking1);
    } catch (err) {
      next(err);
    }
  };  


  export const getHote = async (req, res, next) => {
    try {
      const hotels = await Booking.findOne( 
        {Date: req.body.Date}
        );
        if(!hotels) return next(createError(402, "OOps Already booked"))

        // const hotel1 = await Hotel.findOne({ roomNumbers: req.body.roomNumbers });
        // if (!hotel1) return next(createError(404, "Hotel not found!"));

      res.status(200).json(hotels);
      
    } catch (err) {
      next(err);
    }
  };
  export const deleteBooking = async (req, res, next) => {
    try {
      await Booking.findByIdAndDelete(req.params.id);
      res.status(200).json("Booking has been cancelled.");
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
export const deleteInfo = async(req, res) => {
    try {
        const aliens = await Booking.deleteMany()
        res.json(aliens)
    } catch (err) {
        res.send('Error' +err)
    }
}