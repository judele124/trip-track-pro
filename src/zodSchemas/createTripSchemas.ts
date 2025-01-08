import { z } from "zod";

const rewardSchema = z
  .object({
    title: z
      .string({ required_error: "Reward title is required." })
      .min(2, {
        message: "Reward title must be at least 2 characters long.",
      })
      .max(25, {
        message: "Reward title must not exceed 25 characters.",
      }),
    // when no image is uploaded the state is holding an ampty FileList
    image: z.instanceof(FileList, { message: "Reward image is required." }).or(
      z
        .instanceof(File, { message: "Reward image is required." })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: "Image file size must not exceed 5MB.",
        })
        .refine(
          (file) =>
            file &&
            [
              "image/png",
              "image/jpeg",
              "image/jpg",
              "image/svg+xml",
              "image/gif",
            ].includes(file.type),
          {
            message:
              "Invalid image file type. Supported formats: PNG, JPEG, JPG, SVG, GIF.",
          },
        ),
    ),
  })
  .strict()
  .or(z.undefined());

export const createTripSchema1 = z
  .object({
    tripName: z
      .string()
      .min(2, { message: "Trip name must be at least 2 characters long." })
      .max(25, { message: "Trip name must not exceed 25 characters." }),
    groupName: z
      .string()
      .min(2, { message: "Group name must be at least 2 characters long." })
      .max(25, { message: "Group name must not exceed 25 characters." }),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters long." })
      .max(500, { message: "Description must not exceed 500 characters." }),
    reward: rewardSchema,
  })
  .strict();

// TODO: add validation stage 2
export const createTripSchema2 = z.any();

export const createTripSchema = [createTripSchema1, createTripSchema2];

export type CreateTripSchemaT = z.infer<
  typeof createTripSchema1 & typeof createTripSchema2
>;
