import Button from "../ui/Button";

const ScanQRForm = () => {
  return (
    <div className="flex flex-col gap-2">
      <span className="pl-5 font-bold">Add a QR</span>
      <Button primary className="w-full" about="add">
        Add
      </Button>
      <span className="pl-5 font-semibold">Create QR</span>
      <Button primary className="w-full" about="create">
        Create
      </Button>
    </div>
  );
};

export default ScanQRForm;