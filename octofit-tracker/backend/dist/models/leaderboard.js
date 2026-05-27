"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leaderboard = void 0;
const mongoose_1 = require("mongoose");
const leaderboardEntrySchema = new mongoose_1.Schema({
    rank: { type: Number, required: true },
    entityType: { type: String, required: true, enum: ['user', 'team'] },
    entityId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    label: { type: String, required: true },
    points: { type: Number, required: true },
}, { _id: false });
const leaderboardSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    scope: { type: String, required: true },
    entries: { type: [leaderboardEntrySchema], required: true },
}, { timestamps: true });
exports.Leaderboard = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
//# sourceMappingURL=leaderboard.js.map