import {z} from "zod";

const contactUsSchema = z
    .object({
        fullName: z.string()
            .nonempty('Required')
            .trim()
            .min(2, {message: `Input must contain at least 2 characters`})
            .max(60, {message: `Input must contain at most 60 characters`}),
        email: z.string()
            .nonempty('Required')
            .email()
            .max(30, {message: `Input must contain at most 30 characters`}),
        phoneNumber: z.string()
            .nonempty('Required')
            .length(10, {message: `Input must contain 10 digits`})
            .regex(/^\d+$/, {message: "Input should only contain digits",}),
        message: z.string()
            .nonempty('Required')
            .trim()
            .min(2, {message: `Input must contain at least 2 characters`})
            .max(300, {message: `Input must contain at most 300 characters`}),
    })
    .strict();

export type contactUsModel = z.infer<typeof contactUsSchema>;

export default contactUsSchema;
