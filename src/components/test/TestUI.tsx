import Modal from "../ui/Modal";
import { useRef, useState } from "react";

const TestUI = () => {
  const [open2, setOpen2] = useState(false);
  const ref2 = useRef<HTMLButtonElement>(null);
  return (
    <div className="mx-auto max-w-[400px]">
      <div className="flex justify-between">
        <button>asd</button>
        <button ref={ref2} onClick={() => setOpen2(true)}>
          s
        </button>
        <Modal
          anchorElement={ref2}
          anchorTo="top-right"
          translate={[410, 40]}
          // center
          open={open2}
          onBackdropClick={() => setOpen2(false)}
        >
          <div className="page-colors w-full rounded-lg p-5">asdasd</div>
        </Modal>
      </div>
    </div>
  );
};

export default TestUI;
