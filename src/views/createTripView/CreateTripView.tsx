import CreateTripForm from "./components/CreateTripForm";

export default function CreateTripView() {
  return (
    <div className="page-colors page-padding size-full text-center">
      <h1 className="py-2 text-3xl font-bold">Enter trip details</h1>
      <CreateTripForm />
    </div>
  );
}
