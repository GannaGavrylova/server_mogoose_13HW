// определяем связь "один ко многи" между моделями  `Publisher` и `Magazine`
import mongoose from "mongoose";

const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
  },
});

export const Publisher = mongoose.model("Publisher", publisherSchema);
