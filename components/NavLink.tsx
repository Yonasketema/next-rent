"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, ...rest }) => {
  const pathName = usePathname();
  const isActive = href === pathName;

  return (
    <Link
      href={href}
      {...rest}
      style={{ backgroundColor: isActive ? "#00ABFF" : "" }}
    />
  );
};

export default NavLink;
