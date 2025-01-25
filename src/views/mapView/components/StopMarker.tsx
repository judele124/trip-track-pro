import Icon from "@/components/icons/Icon";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import useToggle from "@/hooks/useToggle";

export default function StopMarker() {
  const { isOpen, toggle } = useToggle();
  return (
    <>
      <Button
        onClick={toggle}
        className="flex max-w-60 items-center justify-between gap-4 bg-light text-dark dark:bg-dark dark:text-light"
      >
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          Some adasdasleadasdasleadasdasleadasdasleadasdasleadasdasleadas
        </p>
        <Icon className="fill-primary" name="target" />
      </Button>
      <ExirienceModal open={isOpen} onBackdropClick={toggle} />
    </>
  );
}

interface IExirienceModalProps {
  open: boolean;
  onBackdropClick: () => void;
}

const ExirienceModal = ({ open, onBackdropClick }: IExirienceModalProps) => {
  return (
    <Modal center open={open} onBackdropClick={onBackdropClick}>
      <div className="size-52 bg-red-500"></div>
    </Modal>
  );
};
