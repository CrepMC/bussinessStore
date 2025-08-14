// Business model placeholder
import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    ownerUserId: { type: mongoose.Types.ObjectId, ref: 'User' },
    email: String,
    phone: String,
    address: String,
    website: String,
    logoUrl: String,
    documents: [String], // URLs file xác minh
    description: String,
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Business', businessSchema);
