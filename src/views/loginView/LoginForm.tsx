import InputWLabel from "../../components/ui/InputWLabel";
import Button from "../../components/ui/Button";
import FormMultipleStages from "../../components/FormMultipleStages";
import InputFeildError from "../../components/ui/InputFeildError";
import { useForm } from "react-hook-form";

type IFormData = {
  email: string;
  name: string;
  code: string;
};
const LoginFrom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  return (
    <FormMultipleStages
      className="flex w-full flex-col gap-3"
      onLastStageSubmit={handleSubmit((data) => {
        console.log(data);
      })}
      onMultipleStageSubmit={handleSubmit((data) => {
        console.log(data);
      })}
      renderStages={[
        () => (
          <>
            <div>
              {errors.email?.message && (
                <InputFeildError message={errors.email.message} />
              )}
              <InputWLabel
                autoComplete="email"
                {...register("email", {
                  required: "This field is required",
                })}
                title="Enter mail address"
                placeholder="Enter mail address"
              />
            </div>
            <Button className="w-full" type="submit" primary>
              Send code
            </Button>
          </>
        ),
        () => (
          <>
            <div>
              {errors.name?.message && (
                <InputFeildError message={errors.name.message} />
              )}
              <InputWLabel
                autoComplete="name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Name must be at most 20 characters",
                  },
                })}
                title="Enter name"
                placeholder="Enter name"
              />
            </div>
            <div>
              {errors.code?.message && (
                <InputFeildError message={errors.code.message} />
              )}
              <InputWLabel
                {...register("code", {
                  required: "Code is required",
                  minLength: {
                    value: 6,
                    message: "Code must be 6 characters",
                  },
                  maxLength: {
                    value: 6,
                    message: "Code must be 6 characters",
                  },
                })}
                title="Enter 6 digits code"
                placeholder="Enter code"
              />
            </div>
            <Button className="w-full" type="submit" primary>
              Send code
            </Button>
          </>
        ),
      ]}
    />
  );
};

export default LoginFrom;
