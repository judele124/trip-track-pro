import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";

export default function PageNotFoundView() {
  return (
    <div className="mt-10 text-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p>Page not found</p>
      <Link to={"/"}>
        <Button className="mt-5 w-full" primary>
          {" "}
          Home
        </Button>
      </Link>
    </div>
  );
}
