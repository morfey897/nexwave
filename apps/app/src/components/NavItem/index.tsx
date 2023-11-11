import clsx from "clsx";
import Link from "next/link";

const Button = (props: React.HTMLAttributes<HTMLButtonElement>) => (
  <button {...props} />
);

function NavItem({
  href,
  onClick,
  label,
  className,
  Icon,
}: {
  onClick?: () => void;
  href?: string;
  className?: string;
  label?: string;
  Icon?: (props: React.SVGProps<any>) => JSX.Element;
}) {
  const Component = href ? Link : Button;

  return (
    <Component
      href={href || ""}
      onClick={onClick}
      className={clsx(
        "flex items-center flex-col lg:flex-row px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700",
        className,
      )}
    >
      {!!Icon && <Icon className={"w-8 h-8 flex-shrink-0"} />}
      {!!label && (
        <span className={"mx-4 font-medium hidden md:block"}>{label}</span>
      )}
    </Component>
  );
}

export default NavItem;
