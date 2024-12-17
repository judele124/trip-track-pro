import InputWLabel from "../../components/ui/InputWLabel";
import Button from "../../components/ui/Button";
import FormMultipleStages from "../../components/FormMultipleStages";
import InputFeildError from "../../components/ui/InputFeildError";
import { LoginSchema, ILoginSchema } from "../../zodSchemas/authSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { API_BASE_URL } from "../../env.config";
import { useNavigate } from "react-router-dom";

const LoginFrom = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const nav = useNavigate();
  const {
    activate,
    loading,
    error: axiosError,
    status,
  } = useAxios({ manual: true });

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginSchema>({
    resolver: zodResolver(LoginSchema[currentStage]),
  });

  const sendCode = async ({ email }: ILoginSchema) => {
    const url = `${API_BASE_URL}/auth/send-code`;
    await activate({ data: { email }, url, method: "post" });
  };

  const verifyCode = async (data: ILoginSchema) => {
    const url = `${API_BASE_URL}/auth/verify-code`;
    await activate({ data, url, method: "post" });
  };

  const onSubmit = async (data: ILoginSchema) => {
    if (currentStage === 0) await sendCode(data);
    if (currentStage === 1) await verifyCode(data);
  };

  useEffect(() => {
    if (status && currentStage === 1 && status >= 200 && status <= 300) {
      nav("/");
    }
  }, [currentStage, status]);

  return (
    <FormMultipleStages
      className="flex w-full flex-col gap-3"
      onLastStageSubmit={handleSubmit(onSubmit)}
      onMultipleStageSubmit={(e, { incrementStage }) => {
        handleSubmit(async (data) => {
          await onSubmit(data);
          incrementStage();
          setCurrentStage((prev) => prev + 1);
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
            {status && status >= 200 && status < 300 ? (
              <p className="text-center">
                code sent to {watch("email")} and will expire in 10 minutes
                can't find it?{" "}
                <span
                  onClick={() => sendCode(watch())}
                  className="cursor-pointer text-dark underline underline-offset-2 dark:text-light"
                >
                  resend code
                </span>
              </p>
            ) : (
              axiosError && (
                <p className="text-center text-red-500">{axiosError.message}</p>
              )
            )}
          </>
        ),
      ]}
    />
  );
};

export default LoginFrom;
