// Product model placeholder
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
    name: { type: String, required: true },
    sku: String,
    price: { type: Number, default: 0 },
    imageUrl: String,
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
