import mongoose from "mongoose";
const BookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
        type: String,
        required: true,
      },
   maxPeople: {
      type: Number,
      required: true,
    },
    roomNumber: Number,
    checkInDate: {
        type: [Date]
    },
    checkOutDate: {
      type: [Date]
  },
  price: {
        type: Number,
        required: true,
      },
   },
  { timestamps: true }
);

export default mongoose.model("Booking", BookSchema);

