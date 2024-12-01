'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AutoRepoNavLogo, IconHamburger, IconXRounded } from 'public/svgs';
import { useEffect, useState } from 'react';

import { authService } from '@/shared/api/services/auth';
import { useAuthStore } from '@/store/auth.store';

import NavButton from './components/nav-button';

interface NavItem {
    label: string;
    link?: string;
    onClick?: () => void;
    subItems?: NavItem[];
}

const Navbar = () => {
    const router = useRouter();
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const { isLoggedIn, setIsLoggedIn, initializeAuth } = useAuthStore();

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    const onSideBarClick = () => {
        setIsSideBarOpen(!isSideBarOpen);
    };

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const handleLogoutConfirm = () => {
        authService.logout();
        setIsLoggedIn(false);
        setShowLogoutModal(false);
        router.push('/');
    };

    const NavLeftList: NavItem[] = [
        { label: 'Dashboard', link: '/template-dashboard' },
        { label: 'Label 생성', link: '/select-repo/label' },
        { label: '템플릿 생성', link: '/select-repo/template-issue' },
        { label: 'ReadMe 생성', link: '/select-repo/read-me' },
    ];

    const NavRightList: NavItem[] = [
        { label: 'AutoRepo?', link: '/intro' },
        isLoggedIn
            ? { label: '로그아웃', onClick: handleLogoutClick }
            : { label: 'Github 로그인', link: '/login' },
    ];

    return (
        <>
            <div className="fixed z-50 flex h-20 w-full items-center justify-between bg-white px-8 py-5 shadow-md">
                {/* Logo */}
                <Link href="/" className="flex items-center pr-8">
                    <AutoRepoNavLogo />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden w-full items-center justify-between desktop:flex">
                    <div className="flex gap-2">
                        {NavLeftList.map((item, index) => (
                            <NavButton
                                key={index}
                                label={item.label}
                                link={isLoggedIn ? item.link : undefined}
                                onClick={item.onClick}
                                subItems={item.subItems}
                                requiresAuth
                                isLoggedIn={isLoggedIn}
                            />
                        ))}
                    </div>
                    <div className="flex gap-2">
                        {NavRightList.map((item, index) => (
                            <NavButton
                                key={index}
                                label={item.label}
                                link={item.link}
                                onClick={item.onClick}
                                subItems={item.subItems}
                            />
                        ))}
                    </div>
                </div>

                {/* Mobile Toggle Icon */}
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

            {/* Sidebar for Mobile */}
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
                                link={isLoggedIn ? item.link : undefined}
                                onClick={item.onClick}
                                subItems={item.subItems}
                                requiresAuth
                                isLoggedIn={isLoggedIn}
                            />
                        ))}
                        {NavRightList.map((item, index) => (
                            <NavButton
                                key={index}
                                label={item.label}
                                link={item.link}
                                onClick={item.onClick}
                                subItems={item.subItems}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* 로그아웃 확인 모달 */}
            <AnimatePresence>
                {showLogoutModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
                        >
                            <h2 className="mb-4 text-xl font-semibold text-neutral-900">
                                로그아웃
                            </h2>
                            <p className="mb-6 text-neutral-600">
                                정말 로그아웃 하시겠습니까?
                            </p>
                            <div className="flex justify-end gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShowLogoutModal(false)}
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-neutral-700 hover:bg-gray-50"
                                >
                                    취소
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleLogoutConfirm}
                                    className="rounded-lg bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800"
                                >
                                    확인
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
