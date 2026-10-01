import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

// Ini Versi ketika masih .jsx, sebelum migrate ke typrscript di day3
// const Modal = ({ children }) => {
//   const elRef = useRef(null);
//   if (!elRef.current) {
//     elRef.current = document.createElement("div");
//   }

//   useEffect(() => {
//     const modalRoot = document.getElementById("modal");
//     modalRoot.appendChild(elRef.current);
//     return () => modalRoot.removeChild(elRef.current);
//   }, []);

//   return createPortal(<div>{children}</div>, elRef.current);
// };

// export default Modal;

const Modal = ({ children }: { children: ReactNode }) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div")
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (!elRef.current || !modalRoot) {
      return;
    }
    modalRoot.appendChild(elRef.current);
    return() => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  },[]);

  return createPortal(<div className="rounded-[30px] bg-background p-3.75 text-center">{children}</div>, elRef.current);
}

export default Modal