import * as yup from 'yup';
import requireSchema from "@/lib/requireStringSchemas/index"

export const loginSchema = ()=> yup.object().shape({
    email: requireSchema.emailRequired(),
    password: requireSchema.passwordRequired(),
});