import CreateTripForm from "./components/CreateTripForm";

export default function CreateTripView() {
  return (
    <>
      <h1 className="py-2 text-center text-3xl font-bold">
        Enter trip details
      </h1>
      <CreateTripForm />
    </>
  );
}
