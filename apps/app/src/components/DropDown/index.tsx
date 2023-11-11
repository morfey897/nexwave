import clsx from "clsx";
import { ReactNode } from "react";

function DropDown({
  Element,
  direction,
  children,
  className,
}: {
  Element: ReactNode;
  direction: { y: "top" | "bottom"; x: "left" | "right" };
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx("group relative", className)}>
      {/* <!-- Dropdown toggle button --> */}
      {Element}
      {/* <!-- Dropdown menu --> */}
      <div
        className={clsx(
          "absolute flex-col opacity-0 scale-0 bg-gray-200 rounded-md shadow-xl dark:bg-gray-600 transition ease-out duration-200 overflow-x-hidden",
          "group-hover:flex group-hover:opacity-100 group-hover:scale-100",
          {
            "origin-bottom-left":
              direction.y === "top" && direction.x === "right",
            "origin-top-left":
              direction.y === "bottom" && direction.x === "right",
            "origin-bottom-right":
              direction.y === "top" && direction.x === "left",
            "origin-top-right":
              direction.y === "bottom" && direction.x === "left",
          },
          {
            "top-0": direction.y === "top",
            "top-full": direction.y === "bottom",
            "left-1/2": direction.x === "right",
            "right-1/2": direction.x === "left",
            "-translate-y-[100%]": direction.y === "top",
            "translate-y-0": direction.y === "bottom",
          },
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default DropDown;
