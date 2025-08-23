import mongoose from "mongoose";

export const SOURCE = [
  "website",
  "facebook_ads",
  "google_ads",
  "referral",
  "events",
  "other",
];
export const STATUS = ["new", "contacted", "qualified", "lost", "won"];

const leadSchema = new mongoose.Schema(
  {
    first_name: { type: String, trim: true, required: true },
    last_name: { type: String, trim: true, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      index: true,
    },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    source: { type: String, enum: SOURCE, required: true },
    status: { type: String, enum: STATUS, default: "new" },
    score: { type: Number, min: 0, max: 100, default: 0 },
    lead_value: { type: Number, default: 0 },
    last_activity_at: { type: Date, default: null },
    is_qualified: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model("Lead", leadSchema);
