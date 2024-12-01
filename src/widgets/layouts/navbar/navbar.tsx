'use client';

import Link from 'next/link';
import { IconHamburger, IconXRounded, AutoRepoNavLogo } from 'public/svgs';
import { useState } from 'react';

import NavButton from './components/nav-button';

interface NavItem {
    label: string;
    link?: string;
    onClick?: () => void;
    subItems?: NavItem[];
}

const Navbar = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    const onSideBarClick = () => {
        setIsSideBarOpen(!isSideBarOpen);
    };

    const NavLeftList: NavItem[] = [
        { label: 'Label 생성', link: '/label' },
        {
            label: '템플릿 생성',
            subItems: [
                { label: 'Issue', link: '/template-issue' },
                { label: 'PR', link: '/template-pr' },
            ],
        },
        { label: 'ReadMe 생성', link: '/read-me' },
    ];

    const NavRightList: NavItem[] = [
        { label: 'AutoRepo?', link: '/intro' },
        { label: 'Github 로그인', link: '/login' },
    ];

    return (
        <>
            <div className="fixed z-50 flex h-20 w-full items-center justify-between bg-white px-8 py-5 shadow-md">
                {/* Logo */}
                <Link href="/" className="flex items-center pr-8">
                    <AutoRepoNavLogo />
                </Link>

                {/* --------------------------------------------- */}
                {/* ------------  Desktop Navigation ------------ */}
                {/* --------------------------------------------- */}
                <div className="hidden w-full items-center justify-between desktop:flex">
                    <div className="flex gap-2">
                        {NavLeftList.map((item, index) => (
                            <NavButton
                                key={index}
                                label={item.label}
                                link={item.link}
                                subItems={item.subItems} // subItems 전달
                            />
                        ))}
                    </div>
                    <div className="flex gap-2">
                        {NavRightList.map((item, index) => (
                            <NavButton
                                key={index}
                                label={item.label}
                                link={item.link}
                                subItems={item.subItems} // 필요한 경우 subItems 전달
                            />
                        ))}
                    </div>
                </div>

                {/* --------------------------------------------- */}
                {/* ------------  Mobile Toggle Icon ------------ */}
                {/* --------------------------------------------- */}
                <div className="desktop:hidden">
                    {isSideBarOpen ? (
                        <IconXRounded
                            className="size-6"
                            onClick={onSideBarClick}
                        />
                    ) : (
                        <IconHamburger
                            className="size-6"
                            onClick={onSideBarClick}
                        />
                    )}
                </div>
            </div>

            {/* --------------------------------------------- */}
            {/* ------------  Sidebar for Mobile ------------ */}
            {/* --------------------------------------------- */}
            {isSideBarOpen && (
                <div className="fixed left-0 top-0 z-40 flex size-full flex-col bg-white p-8 desktop:hidden">
                    <div className="mb-8 flex items-center justify-between">
                        <Link
                            href="/"
                            className="flex items-center"
                            onClick={onSideBarClick}
                        >
                            <AutoRepoNavLogo />
                        </Link>
                        <IconXRounded
                            className="size-6"
                            onClick={onSideBarClick}
                        />
                    </div>
                    <div className="flex flex-col gap-6">
                        {NavLeftList.map((item, index) => (
                            <NavButton
                                key={index}
                                label={item.label}
                                link={item.link}
                                subItems={item.subItems} // subItems 전달
                                onClick={onSideBarClick}
                            />
                        ))}
                        {NavRightList.map((item, index) => (
                            <NavButton
                                key={index}
                                label={item.label}
                                link={item.link}
                                subItems={item.subItems} // 필요한 경우 subItems 전달
                                onClick={onSideBarClick}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
