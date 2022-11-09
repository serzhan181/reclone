import { FC, ReactNode } from "react";

export interface IModal {
  active: boolean;
  setActive: (isActive: boolean) => void;
  children?: ReactNode;
}

export const Modal: FC<IModal> = ({ active, setActive, children }) => {
  return (
    <div
      className={`fixed top-0 left-0 z-50 flex w-screen h-screen opacity-0 pointer-events-none duration-500  bg-black bg-opacity-50 flex-center ${
        active ? "opacity-100 pointer-events-auto" : "opacity-0"
      }`}
      onClick={() => setActive(false)}
    >
      <div
        className={`p-4 bg-white rounded-3xl duration-300 ${
          active ? "scale-100" : "scale-50"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
