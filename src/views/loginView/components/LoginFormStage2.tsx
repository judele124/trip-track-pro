import { FieldErrors, UseFormRegister } from "react-hook-form";
import Button from "../../../components/ui/Button";
import InputFeildError from "../../../components/ui/InputFeildError";
import InputWLabel from "../../../components/ui/InputWLabel";
import { LoginSchemaT } from "../../../zodSchemas/authSchemas";

export default function LoginFormStage2({
  email,
  register,
  errors,
  sendCodeStatus,
  loading,
  verifyCodeError,
  resendCode,
}: {
  email: string;
  register: UseFormRegister<LoginSchemaT>;
  errors: FieldErrors<LoginSchemaT>;
  sendCodeStatus: number | undefined;
  verifyCodeError: Error | null;
  loading: boolean;
  resendCode: () => void;
}) {
  return (
    <>
      <div>
        {errors.name?.message && (
          <InputFeildError message={errors.name?.message} />
        )}
        <InputWLabel
          autoComplete="name"
          {...register("name")}
          title="Enter name"
          placeholder="Enter name"
        />
      </div>
      <div>
        {errors.code?.message && (
          <InputFeildError message={errors.code.message} />
        )}
        <InputWLabel
          {...register("code")}
          title="Enter 6 digits code"
          placeholder="Enter code"
        />
      </div>
      <Button className="w-full" type="submit" primary>
        {loading ? "Loading..." : "Verify code"}
      </Button>
      {isStatusSuccessful(sendCodeStatus) && (
        <p className="text-center">
          code sent to {email} and will expire in 10 minutes can't find it?{" "}
          <span
            onClick={resendCode}
            className="cursor-pointer text-dark underline underline-offset-2 dark:text-light"
          >
            resend code
          </span>
        </p>
      )}
      {verifyCodeError && (
        <p className="text-center text-red-500">{verifyCodeError.message}</p>
      )}
    </>
  );
}
const isStatusSuccessful = (status: number | undefined) => {
  return status && status >= 200 && status <= 300;
};
