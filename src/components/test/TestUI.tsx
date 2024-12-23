import Modal from "../ui/Modal";
import { useRef, useState } from "react";

const TestUI = () => {
  const [open2, setOpen2] = useState(false);
  const ref2 = useRef<HTMLDivElement>(null);
  return (
    <div className="mx-auto max-w-[400px]">
      <div className="flex justify-between">
        <button>asd</button>
        <button onClick={() => setOpen2(true)}>s</button>
      </div>
      <Modal
        anchorElement={ref2}
        anchorTo="bottom"
        // center
        open={open2}
        onBackdropClick={() => setOpen2(false)}
      >
        <div className="page-colors size-40 rounded-lg p-10">asdasd</div>
      </Modal>
      <div ref={ref2} className="mt-[200px] size-20 bg-red-500"></div>
    </div>
  );
};

export default TestUI;
