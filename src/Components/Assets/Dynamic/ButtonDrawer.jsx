import React from "react";
import { Drawer } from "antd";

/**
 * Reusable ButtonDrawer Component
 *
 * @param {string} title - Title of the drawer.
 * @param {"top" | "bottom" | "left" | "right"} placement - Drawer placement. Default: "top".
 * @param {number | string} height - Drawer height (if top/bottom). Default: 250.
 * @param {number | string} width - Drawer width (if left/right). Default: "60%".
 * @param {ReactNode} children - Trigger element(s) to render alongside the drawer.
 * @param {ReactNode} DrawerContent - Content to render inside the drawer.
 * @param {boolean} open - Controls whether the drawer is open.
 * @param {function} setOpen - Function to update the open state.
 * @param {string} containerSelector - Query selector for the drawer’s container. Default: ".modal".
 */
const ButtonDrawer = ({
  title,
  placement = "top",
  height = 250,
  width = "60%",
  children,
  DrawerContent,
  setOpen,
  open,
  containerSelector = ".modal",
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      {children || null}

      <Drawer
        title={title}
        placement={placement}
        height={height}
        width={width}
        open={open}
        onClose={() => setOpen(false)}
        mask={false} // no black overlay
        closable={false} // no close button
        getContainer={() => document.querySelector(containerSelector)}
        style={{
          width: width,
          margin: "5px auto",
          borderRadius: "12px",
          boxShadow: "none",
        }}
        styles={{
          body: { boxShadow: "none", maxHeight: "70vh", overflowY: "auto" },
          content: { boxShadow: "none" },
          wrapper: { boxShadow: "none" },
          header: {
            // backgroundColor: "#b4368f", // custom bg color
            background: "linear-gradient(60deg,  #158b50ff, #36b446)", // 🌈 gradient
            color: "#fff", // header text color
            fontWeight: "600", // bold title
          },
        }}
      >
        {DrawerContent}
      </Drawer>
    </div>
  );
};

export default ButtonDrawer;