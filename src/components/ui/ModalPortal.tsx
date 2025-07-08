import React from "react";
import { createPortal } from "react-dom";

export default function ModalPortal({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof window === "undefined") {
    return null;
  }
  // TODO: Hide outer scroll when modal is open
  // useEffect(() => {
  //   const originalStyle = window.getComputedStyle(
  //     document.documentElement,
  //   ).overflow;

  //   document.documentElement.style.overflow = "hidden";

  //   return () => {
  //     document.documentElement.style.overflow = originalStyle;
  //   };
  // }, []);

  const node = document.getElementById("portal") as Element;

  return createPortal(children, node);
}
