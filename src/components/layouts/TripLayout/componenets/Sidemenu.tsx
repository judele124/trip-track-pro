import { RefObject } from "react";
import Modal from "../../../ui/Modal";
import Icon, { IconName } from "../../../icons/Icon";

interface Props {
  toggleMenu: () => void;
  isMenuOpen: boolean;
  toggleMenuRef: RefObject<HTMLButtonElement>;
}

export default function Sidemenu({
  toggleMenu,
  isMenuOpen,
  toggleMenuRef,
}: Props) {
  const menuItems: { title: string; icon: IconName; onClick: () => void }[] = [
    {
      title: "Settings",
      icon: "settings",
      onClick: () => {},
    },
    {
      title: "Edit Trip",
      icon: "edit",
      onClick: () => {},
    },
  ];

  return (
    <Modal
      backgroundClassname="bg-transparent"
      onBackdropClick={toggleMenu}
      anchorElement={toggleMenuRef}
      anchorTo="top-left"
      open={isMenuOpen}
    >
      <ul className="page-colors mt-5 flex min-w-44 flex-col rounded-2xl bg-black px-3 py-1 text-white">
        {menuItems.map(({ title, icon, onClick }, i) => (
          <li
            key={title}
            onClick={onClick}
            className={`group flex gap-2 p-3 ${i != menuItems.length - 1 && "border-b-2 border-secondary"}`}
          >
            <Icon
              name={icon}
              className="transition-all group-hover:fill-primary"
            />
            <p className="transition-all group-hover:font-semibold">{title}</p>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
