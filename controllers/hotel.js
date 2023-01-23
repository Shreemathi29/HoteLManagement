import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { createError } from "../utils/error.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findOne(req.body);
    if (!hotel) return next(createError(404, "Hotel not found!"));   
     
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

// export const getHotelbyPincode = async (req, res, next) => {
//   try {
//     const hotel = await Hotel.find({
//       city: req.body.city
//     });
//     res.status(200).json(hotel);
//   } catch (err) {
//     next(err);
//   }
// };

export const getHotelType = async (req, res, next) => {
  try {
    const hotels = await Hotel.find( 
      {type: req.body.type}
      );
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
     
      pincode: {$gt: min | 632001, $lt: max || 632011},
      
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};


// export const getHotels = async (req, res, next) => {
//   const { min, max, ...others } = req.query;
//   try {
//     const hotels = await Hotel.find({
//       ...others,
      
//      city:req.query.city,
//       distance: { $gt: min | 3, $lt: max || 9 },
//       pincode: {$gt: min | 632001, $lt: max || 632019},
      
//     });
//     res.status(200).json(hotels);
//   } catch (err) {
//     next(err);
//   }
// };


// export const getHotels = async (req, res, next) => {
//   const { min, max, ...others } = req.query;
//   try {
//     const hotels = await Hotel.find({
//       ...others,
//       cheapestPrice: { $gt: min | 1, $lt: max || 999 },
//     });
//     res.status(200).json(hotels);
//   } catch (err) {
//     next(err);
//   }
// };

export const countByCity = async (req, res, next) => {
  try {
    const vellore = await Hotel.countDocuments({city: "vellore"});
    const katpadi = await Hotel.countDocuments({ city: "katpadi" });
    const chennai = await Hotel.countDocuments({ city: "chennai" });
    const Kanchipuram = await Hotel.countDocuments({city: "Kanchipuram" });
   

    res.status(200).json( [
      { city: "vellore", count: vellore},
      { city: "katpadi", count: katpadi },
      { city: "chennai", count: chennai },
      { city: "Kanchipuram", count: Kanchipuram },
    
    ]);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "single_bedroom" });
    const resortCount = await Hotel.countDocuments({ type: "double_bedroom" });
    const villaCount = await Hotel.countDocuments({ type: "SingleCot" });
    

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "single_bedroom", count: apartmentCount },
      { type: "double_bedroom", count: resortCount },
      { type: "SingleCot", count: villaCount },
    ]);
  } catch (err) {
    next(err);
  }
};


