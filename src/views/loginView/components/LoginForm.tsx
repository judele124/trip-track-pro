import FormMultipleStages from "../../../components/FormMultipleStages";
// import { loginSchema, LoginSchemaT } from "../../../zodSchemas/authSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import LoginFormStage1 from "./LoginFormStage1";
import LoginFormStage2 from "./LoginFormStage2";
import { Types, Schemas } from "trip-track-package";

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
    verifyCodeStatus,
  } = useAuthContext();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Types["Auth"]["LoginSchema"]>({
    resolver: zodResolver(Schemas.auth.multipleStepsLoginSchema[currentStage]),
  });

  const onSubmit = async (data: Types["Auth"]["LoginSchema"]) => {
    if (currentStage === 0) await sendCode(data.email);
    if (currentStage === 1) {
      await verifyCode(data);
    }
  };

  useEffect(() => {
    if (verifyCodeStatus === 200) nav("/");
  }, [verifyCodeStatus]);

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
        <LoginFormStage1
          register={register}
          errors={errors}
          loading={loading}
          sendCodeError={sendCodeError}
        />,
        <LoginFormStage2
          email={watch("email")}
          register={register}
          errors={errors}
          sendCodeStatus={sendCodeStatus}
          verifyCodeError={verifyCodeError}
          loading={loading}
          resendCode={() => sendCode(watch("email"))}
        />,
      ]}
    />
  );
};

export default LoginFrom;
