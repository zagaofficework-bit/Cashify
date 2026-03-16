const mongoose = require("mongoose");

const evaluationConfigSchema = new mongoose.Schema(
  {
    // Questions — Yes/No
    questions: [
      {
        key:         { type: String, required: true }, // "can_make_calls"
        label:       { type: String, required: true }, // "Are you able to make and receive calls?"
        description: { type: String, default: null },  // helper text
        // if answer is "No", deduct this %
        deductionOnNo: { type: Number, default: 0 },
        order:         { type: Number, default: 0 },
      }
    ],

    // Defects — multi-select, each deducts %
    defects: [
      {
        key:       { type: String, required: true },  // "front_camera_not_working"
        label:     { type: String, required: true },  // "Front Camera not working"
        deduction: { type: Number, required: true },  // % to deduct e.g. 5
        order:     { type: Number, default: 0 },
      }
    ],

    // Accessories — add back small %
    accessories: [
      {
        key:      { type: String, required: true },  // "original_charger"
        label:    { type: String, required: true },  // "Original Charger of Device"
        addition: { type: Number, default: 0 },      // % to add back e.g. 2
        order:    { type: Number, default: 0 },
      }
    ],

    // Processing fee — flat deduction shown in price summary
    processingFee: { type: Number, default: 49 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EvaluationConfig", evaluationConfigSchema);