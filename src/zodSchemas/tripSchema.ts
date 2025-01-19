// import { z } from "zod";

// // experience schemas
// export enum ExperienceType {
//   TRIVIA = "trivia",
//   INFO = "info",
//   TREASURE_FIND = "treasure_find",
// }

// const TriviaSchema = z.object({
//   type: z.literal(ExperienceType.TRIVIA),

//   data: z.object({
//     question: z
//       .string()
//       .min(6, {
//         message: "Trivia question must be at least 2 characters long.",
//       })
//       .max(100, {
//         message: "Trivia question must be at most 200 characters long.",
//       }),

//     options: z
//       .array(
//         z
//           .string()
//           .min(2, { message: "Option must be at least 2 chars" })
//           .max(100, { message: "Option must be at most 100 chars" }),
//       )
//       .min(2, {
//         message: "Trivia must have at least 2 options.",
//       })
//       .max(4, {
//         message: "Trivia must have at most 4 options.",
//       }),

//     answer: z
//       .string()
//       .min(6, {
//         message: "Trivia answer must be at least 2 characters long.",
//       })
//       .max(100, {
//         message: "Trivia answer must be at most 200 characters long.",
//       }),
//   }),

//   score: z
//     .number({
//       required_error: "Trivia score is required.",
//       invalid_type_error: "Trivia score must be a number.",
//     })
//     .optional(),
// });

// const InfoSchema = z.object({
//   type: z.literal(ExperienceType.INFO),
//   data: z.object({
//     text: z.string({
//       required_error: "Info text is required.",
//       invalid_type_error: "Info text must be a string.",
//     }),
//   }),
//   score: z
//     .number({
//       required_error: "Info score is required.",
//       invalid_type_error: "Info score must be a number.",
//     })
//     .optional(),
// });

// const TreasureSchema = z.object({
//   type: z.literal(ExperienceType.TREASURE_FIND),
//   data: z.object({
//     description: z.string({
//       required_error: "Treasure description is required.",
//       invalid_type_error: "Treasure description must be a string.",
//     }),
//     photo: z
//       .string()
//       .optional()
//       .or(z.undefined())
//       .refine((val) => val === undefined || val.trim() !== "", {
//         message: "Treasure photo must be a non-empty string if provided.",
//       }),
//   }),
//   score: z
//     .number({
//       required_error: "Treasure score is required.",
//       invalid_type_error: "Treasure score must be a number.",
//     })
//     .optional(),
// });

// export const experienceSchema = z.discriminatedUnion("type", [
//   TriviaSchema,
//   InfoSchema,
//   TreasureSchema,
// ]);

// // stops schemas
// export const StopSchema = z.object({
//   location: z.object({
//     lon: z.number({
//       required_error: "Longitude is required.",
//       invalid_type_error: "Longitude must be a number.",
//     }),

//     lat: z.number({
//       required_error: "Latitude is required.",
//       invalid_type_error: "Latitude must be a number.",
//     }),
//   }),

//   address: z
//     .string()
//     .min(5, { message: "Code must be exactly 5 characters" })
//     .max(200, { message: "Code must be exactly 200 characters" })
//     .optional(),

//   experience: experienceSchema.optional(),
// });

// export const stopsSchema = z.object({
//   stops: z
//     .array(StopSchema, {
//       required_error: "Stops are required.",
//       invalid_type_error: "Stops must be an array of objects.",
//     })
//     .min(2, {
//       message: "Trip must have at least 2 stops.",
//     }),
// });

// // reward schemas
// const rewardSchema = z
//   .object({
//     title: z
//       .string()
//       .min(2, {
//         message: "Reward title must be at least 2 characters long.",
//       })
//       .max(25, {
//         message: "Reward title must not exceed 25 characters.",
//       }),
//     image: z
//       .instanceof(File, { message: "Reward image is required." })
//       .refine((file) => file.size <= 5 * 1024 * 1024, {
//         message: "Image file size must not exceed 5MB.",
//       })
//       .refine(
//         (file) =>
//           file &&
//           [
//             "image/png",
//             "image/jpeg",
//             "image/jpg",
//             "image/svg+xml",
//             "image/gif",
//           ].includes(file.type),
//         {
//           message:
//             "Invalid image file type. Supported formats: PNG, JPEG, JPG, SVG, GIF.",
//         },
//       ),
//   })
//   .or(z.undefined());

// // trip details schemas
// export const tripDetailsSchema = z.object({
//   name: z
//     .string()
//     .min(2, { message: "Group name must be at least 2 characters long" })
//     .max(15, { message: "Group name must be at most 15 characters long" }),

//   groupName: z
//     .string()
//     .min(2, { message: "Group name must be at least 2 characters long" })
//     .max(15, { message: "Group name must be at most 15 characters long" })
//     .optional(),

//   description: z
//     .string()
//     .min(2, { message: "Description must be at least 2 characters long" })
//     .max(200, { message: "Description must be at most 200 characters long" })
//     .optional(),

//   reward: rewardSchema,
// });

// export const multipleStepsTripSchema = [tripDetailsSchema, stopsSchema];

// export const createTripSchema = tripDetailsSchema.merge(stopsSchema);

// export type Trivia = z.infer<typeof TriviaSchema>;
// export type Info = z.infer<typeof InfoSchema>;
// export type Treasure = z.infer<typeof TreasureSchema>;

// export type TripDetails = z.infer<typeof tripDetailsSchema>;
// export type Stops = z.infer<typeof stopsSchema>;
// export type Reward = z.infer<typeof rewardSchema>;
// export type Experience = z.infer<typeof experienceSchema>;

// export type Stop = z.infer<typeof StopSchema>;
// export type Trip = z.infer<typeof createTripSchema>;
