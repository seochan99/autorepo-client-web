import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface NavItem {
    label: string;
    link?: string;
    onClick?: () => void;
    subItems?: NavItem[];
}

interface NavButtonProps extends NavItem {
    className?: string;
    requiresAuth?: boolean;
    isLoggedIn?: boolean;
}

const selectStyle = 'text-neutral-900';

const NavButton = ({
    label,
    link,
    onClick,
    subItems,
    className,
    requiresAuth,
    isLoggedIn,
}: NavButtonProps) => {
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
            className="group relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link
                className={`cursor-pointer whitespace-nowrap rounded-md text-h2 text-neutral-500 ${isActive} px-5 py-3 transition duration-200 ease-in-out hover:bg-neutral-50 ${className || ''}`}
                href={link || '#'}
                onClick={onClick}
            >
                {label}
                {requiresAuth && !isLoggedIn && (
                    <div className="absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 rounded-lg bg-neutral-800 px-4 py-2 text-sm text-white opacity-0 shadow-lg transition-opacity group-hover:block group-hover:opacity-100">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-b-neutral-800"></div>
                        로그인 후 이용해주세요!
                    </div>
                )}
            </Link>

            {subItems && isDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-40 rounded-md bg-white shadow-lg">
                    {subItems.map((subItem, index) => {
                        const subItemIsActive =
                            subItem.link === pathname ? selectStyle : '';
                        return (
                            <Link
                                key={index}
                                href={subItem.link || '#'}
                                onClick={subItem.onClick}
                                className={`block px-4 py-2 text-sub1 text-neutral-700 hover:bg-neutral-100 ${subItemIsActive}`}
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
