import iconConfig from "./icon.config";

interface IIconProps {
  size?: string;
  name: string;
  className?: string;
  viewBox?: string;
  notificationCount?: number;
}

export default function Icon({
  size = "25px",
  name,
  viewBox = "0 0 24 24",
  className = "",
  notificationCount,
}: IIconProps) {
  return (
    <div className="relative">
      {notificationCount && (
        <span className="absolute right-0 top-0 size-4 -translate-y-1/2 translate-x-1/2 content-center rounded-full bg-primary text-center text-xs font-semibold leading-none text-white">
          {notificationCount}
        </span>
      )}
      <svg
        className={`fill-dark dark:text-white ${className}`}
        width={size}
        height={size}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        {iconConfig(name as keyof typeof iconConfig)}
      </svg>
    </div>
  );
}
