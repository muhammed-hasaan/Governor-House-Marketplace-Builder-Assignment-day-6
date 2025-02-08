import Link from "next/link";

interface ObjectProps {
  label: string;
  link: string;
}

interface NavItemsProps {
  items: ObjectProps[];
  className?: string; // Optional custom className for styling
}

const NavItems = ({ items, className }: NavItemsProps) => {
  return (
    <>
      {items.map((item, index) => (
        <li key={index}>
          <Link
            href={item?.link}
            className="font-satoshi text-satoshi-12 text-[#726E8D]"
          >
            {item?.label}
          </Link>
        </li>
      ))}
    </>
  );
};

export default NavItems;
