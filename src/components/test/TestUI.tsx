import { FormEvent, useEffect, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import InputWLabel from "../ui/InputWLabel";

const TestUI = () => {
  return (
    <div className="page-padding min-h-dvh bg-light dark:bg-dark dark:text-light">
      <TestFormWithInputs />
    </div>
  );
};

interface IUser {
  email: string;
  name: string;
  password: string;
}

const TestFormWithInputs = () => {
  const [data, setData] = useState<IUser>({
    email: "",
    name: "",
    password: "",
  });
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-center">Form</h2>
      <InputWLabel
        onChange={(e) => setData({ ...data, email: e.target.value })}
        title="Email address"
        type="email"
        name={"email"}
      />
      <InputWLabel title="Full Name" type="text" name={"name"} />
      <InputWLabel title="Password" type="password" name={"password"} />
      <InputWLabel
        name="test"
        type="text"
        onChange={(e) => console.log(e.target.value)}
        placeholder="text area like"
        textarea
      />
      <Input
        name="test"
        type="text"
        onChange={(e) => console.log(e.target.value)}
        placeholder="text area like"
        textarea
      />
      <Button type="submit" primary className="mt-2 w-full">
        Submit
      </Button>
    </form>
  );
};

export default TestUI;
