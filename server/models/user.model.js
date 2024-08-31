const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    ph_no: { type: Number, required: true },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true,
        default: 'user'
    },
    created_at: { type: Date, default: Date.now },
}, { versionKey: false, timestamps: true });

const userModel = mongoose.model("user", userSchema);

module.exports = userModel
