import CreateTripForm from "./components/CreateTripForm";

export default function CreateTripView() {
  return (
    <div className="page-colors page-padding size-full text-center">
      <div className="py-2">
        <i>
          <svg
            width="40"
            height="23"
            viewBox="0 0 40 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 2L2 11.25L13 21M38 11H2"
              stroke="#19181E"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </i>
      </div>
      <h1 className="py-2 text-3xl font-bold">Enter trip details</h1>
      <CreateTripForm />
    </div>
  );
}
