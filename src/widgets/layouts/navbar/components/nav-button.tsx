import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface NavItem {
    label: string;
    link?: string;
    onClick?: () => void;
    subItems?: NavItem[];
}

const selectStyle = 'text-neutral-900';

const NavButton: React.FC<NavItem> = ({ label, link, onClick, subItems }) => {
    const pathname = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    let isActive = '';
    if (link && pathname === link) {
        isActive = selectStyle;
    } else if (
        subItems &&
        subItems.some((subItem) => subItem.link === pathname)
    ) {
        isActive = selectStyle;
    }

    const handleMouseEnter = () => setIsDropdownOpen(true);
    const handleMouseLeave = () => setIsDropdownOpen(false);

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link
                className={`cursor-pointer whitespace-nowrap rounded-md text-h2 text-neutral-500 ${isActive} px-5 py-3 transition duration-200 ease-in-out hover:bg-neutral-50`}
                href={link || '#'}
                onClick={onClick}
            >
                {label}
            </Link>

            {subItems && isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg rounded-md">
                    {subItems.map((subItem, index) => {
                        const subItemIsActive =
                            subItem.link === pathname ? selectStyle : '';
                        return (
                            <Link
                                key={index}
                                href={subItem.link || '#'}
                                onClick={subItem.onClick}
                                className={`block px-4 py-2 text-neutral-700 hover:bg-neutral-100 text-sub1 ${subItemIsActive}`}
                            >
                                {subItem.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default NavButton;
