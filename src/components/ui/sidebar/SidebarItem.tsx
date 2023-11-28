import Link from "next/link";
import { type IconType } from "react-icons";

interface Props {
    Icon: IconType;
    name: string;
    href: string;
    size?: number;
}

export const SidebarItem = ({Icon, name, href, size = 30}: Props) => {
  return (
    <Link href={href}
    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
>
    <Icon size={size}/>
    <span className="ml-3 text-xl">{name}</span>
</Link>
  )
}
