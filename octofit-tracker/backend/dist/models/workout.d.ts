export interface IWorkout {
    name: string;
    category: string;
    durationMinutes: number;
    difficulty: string;
    targetMuscles: string[];
    description: string;
}
export declare const Workout: import("mongoose").Model<IWorkout, {}, {}, {}, import("mongoose").Document<unknown, {}, IWorkout> & IWorkout & {
    _id: import("mongoose").Types.ObjectId;
}, any>;
//# sourceMappingURL=workout.d.ts.map