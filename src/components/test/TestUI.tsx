import Button from "../ui/Button";

const TestUI = () => {
  return (
    <div className="page-padding dark:bg-dark dark:text-light bg-light">
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
      <Button className="w-full bg-light text-dark border-2 border-primary dark:bg-dark">
        Button
      </Button>
    </div>
  );
};

export default TestUI;
