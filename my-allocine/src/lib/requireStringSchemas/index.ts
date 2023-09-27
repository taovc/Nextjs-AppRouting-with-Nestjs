import * as yup from "yup";

const emailRequired = () =>
  yup.string().required("error-email-required").email("error-email-format");
const passwordRequired = () =>
  yup
    .string()
    .required("error-password-required")
    .min(8, "error-password-min-length")
    .max(20, "error-password-max-length");
const passwordConfirmRequired = (prevPassword: string) =>
  yup
    .string()
    .required("error-password-confirm-required")
    .oneOf([yup.ref(prevPassword)], "error-password-confirm-match");

const requireSchema = {
  passwordRequired,
  passwordConfirmRequired,
  emailRequired,
};

export default requireSchema;
