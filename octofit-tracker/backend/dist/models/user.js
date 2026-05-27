"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    profile: { type: String, required: true },
    totalPoints: { type: Number, required: true, default: 0 },
    team: { type: mongoose_1.Types.ObjectId, ref: 'Team' },
    joinedAt: { type: Date, required: true, default: Date.now },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=user.js.map