import InputWLabel from "../../components/ui/InputWLabel";
import Button from "../../components/ui/Button";
import FormMultipleStages from "../../components/FormMultipleStages";
import InputFeildError from "../../components/ui/InputFeildError";
import { loginSchema, LoginSchema } from "../../zodSchemas/authSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const LoginFrom = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const nav = useNavigate();

  const {
    sendCode,
    verifyCode,
    loading,
    sendCodeError,
    verifyCodeError,
    sendCodeStatus,
  } = useAuthContext();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema[currentStage]),
  });

  const onSubmit = async (data: LoginSchema) => {
    if (currentStage === 0) await sendCode(data.email);
    if (currentStage === 1) {
      await verifyCode(data);
      nav("/");
    }
  };

  return (
    <FormMultipleStages
      className="flex w-full flex-col gap-3"
      onLastStageSubmit={handleSubmit(onSubmit)}
      onMultipleStageSubmit={(e, { incrementStage }) => {
        handleSubmit(async (data) => {
          try {
            await onSubmit(data);
            incrementStage();
            setCurrentStage((prev) => prev + 1);
          } catch (error) {
            console.error(error);
          }
        })(e);
      }}
      renderStages={[
        () => (
          <>
            <div>
              {errors.email?.message && (
                <InputFeildError message={errors.email.message} />
              )}
              <InputWLabel
                autoComplete="email"
                {...register("email")}
                title="Enter mail address"
                placeholder="Enter mail address"
              />
            </div>
            <Button className="w-full" type="submit" primary>
              {loading ? "Sending code..." : "Send code"}
            </Button>
            {sendCodeError && (
              <p className="text-center text-red-500">
                {sendCodeError.message}
              </p>
            )}
          </>
        ),
        () => (
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
                code sent to {watch("email")} and will expire in 10 minutes
                can't find it?{" "}
                <span
                  onClick={() => sendCode(watch("email"))}
                  className="cursor-pointer text-dark underline underline-offset-2 dark:text-light"
                >
                  resend code
                </span>
              </p>
            )}
            {verifyCodeError && (
              <p className="text-center text-red-500">
                {verifyCodeError.message}
              </p>
            )}
          </>
        ),
      ]}
    />
  );
};

export default LoginFrom;

const isStatusSuccessful = (status: number | undefined) => {
  return status && status >= 200 && status <= 300;
};
