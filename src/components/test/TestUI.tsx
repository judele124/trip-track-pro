import { FormEvent } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import InputWLabel from "../ui/InputWLabel";

const TestUI = () => {
  return (
    <div className="page-padding bg-light dark:bg-dark dark:text-light">
      <h1>Lorem ipsum dolor sit amet.</h1>
      <h2>Lorem ipsum dolor sit amet.</h2>
      <h3>Lorem ipsum dolor sit amet.</h3>
      <h4>Lorem ipsum dolor sit amet.</h4>
      <h5>Lorem ipsum dolor sit amet.</h5>
      <h6>Lorem ipsum dolor sit amet.</h6>
      <p>Lorem ipsum dolor sit amet.</p>
      <Button className="w-full" primary>
        Button
      </Button>
      <Button className="w-full">Button</Button>
      <Button className="w-full border-2 border-primary bg-light text-dark dark:bg-dark">
        Button
      </Button>
      <TestFormWithInputs />
    </div>
  );
};

const TestFormWithInputs = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };
  return (
    <form onSubmit={onSubmit}>
      <InputWLabel type="email" name={"email"} />
      <InputWLabel type="text" name={"name"} />
      <InputWLabel type="password" name={"password"} />
      <Button type="submit" primary className="w-full">
        Submit
      </Button>
    </form>
  );
};

export default TestUI;
