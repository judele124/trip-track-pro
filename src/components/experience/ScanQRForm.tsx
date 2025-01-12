import Button from "../ui/Button";

const ScanQRForm = () => {
  return (
    <>
      <div>
        <p className="pl-5 mb-1 font-bold">Add a QR</p>
        <Button primary className="w-full" about="add">
          Add
        </Button>
      </div>
      <div>
        <p className="pl-5 mb-1 font-semibold">Create QR</p>
        <Button primary className="w-full" about="create">
          Create
        </Button>
      </div>
    </>
  );
};

export default ScanQRForm;
