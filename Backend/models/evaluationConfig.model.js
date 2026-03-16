const mongoose = require("mongoose");

const evaluationConfigSchema = new mongoose.Schema(
  {
    // ─── ONE CONFIG PER CATEGORY ───────────────────────────────────
    category: {
      type:     String,
      enum:     ["mobile", "laptop", "tablet", "smartwatch", "camera"],
      required: true,
      unique:   true,   // one config per category
    },

    questions: [
      {
        key:           { type: String, required: true },
        label:         { type: String, required: true },
        description:   { type: String, default: null },
        deductionOnNo: { type: Number, default: 0 },
        order:         { type: Number, default: 0 },
      }
    ],

    defects: [
      {
        key:       { type: String, required: true },
        label:     { type: String, required: true },
        deduction: { type: Number, required: true },
        order:     { type: Number, default: 0 },
      }
    ],

    accessories: [
      {
        key:      { type: String, required: true },
        label:    { type: String, required: true },
        addition: { type: Number, default: 0 },
        order:    { type: Number, default: 0 },
      }
    ],

    processingFee: { type: Number, default: 49 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EvaluationConfig", evaluationConfigSchema);