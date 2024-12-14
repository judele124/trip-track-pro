import Input from "../ui/Input";
import FormMultipleStages from "../FormMultipleStages";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import InputWLabel from "../ui/InputWLabel";

const TestUI = () => {
  return (
    <>
      <TestCreateTripForm />
    </>
  );
};

const TestCreateTripForm = () => {
  const { register, handleSubmit } = useForm();
  return (
    <FormMultipleStages
      onMultipleStageSubmit={({ stage, incrementStage }) => {
        handleSubmit(async (data) => {
          try {
            const { status } = await fakeFetch();
            console.log(data);
            incrementStage();
          } catch (error) {
            console.log(error);
          }
        })();
      }}
      renderStages={[
        () => (
          <>
            <InputWLabel
              title="Enter trip name"
              placeholder="Enter trip name"
              {...register("tripName")}
            />
            <InputWLabel
              title="Enter group name"
              placeholder="Enter group name"
              {...register("groupName")}
            />
            <InputWLabel
              title="Enter extra information"
              textarea
              {...register("extraDetails")}
            />
            <Button className="w-full">Next</Button>
          </>
        ),
        () => (
          <>
            <InputWLabel
              title="Enter first stop"
              placeholder="Enter first stop"
              {...register("firstStop")}
            />
            <Button>add stop</Button>
            <InputWLabel
              title="Enter last stop"
              placeholder="Enter last stop"
              {...register("lastStop")}
            />
            <Button className="w-full">Next</Button>
          </>
        ),
      ]}
    />
  );
};

const TestLoginForm = () => {
  const { register, handleSubmit } = useForm();
  return (
    <>
      <FormMultipleStages
        onMultipleStageSubmit={({ stage, incrementStage }) => {
          if (stage === 0) {
            handleSubmit(async (data) => {
              try {
                const { status } = await fakeFetch();
                console.log(data);
                if (status === 200) incrementStage();
              } catch (error) {
                console.log(error);
              }
            })();
          } else {
            handleSubmit(async (data) => {
              try {
                const { status } = await fakeFetch();
                console.log(data);
                if (status === 200) incrementStage();
              } catch (error) {
                console.log(error);
              }
            })();
          }
        }}
        renderStages={[
          () => (
            <>
              <Input
                key={"email"}
                placeholder="Enter mail address"
                type="email"
                {...register("email")}
              />
              <Button className="w-full">Next</Button>
            </>
          ),
          () => (
            <>
              <Input
                key={"name"}
                placeholder="Enter name"
                type="name"
                {...register("name")}
              />
              <Input
                key={"code"}
                placeholder="Enter code"
                type="number"
                {...register("code")}
              />
              <Button className="w-full">Verify</Button>
            </>
          ),
        ]}
      />
    </>
  );
};

export default TestUI;

const fakeFetch = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { status: 200 };
};
