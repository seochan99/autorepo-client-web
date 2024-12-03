import '../styles';

import Navbar from '@widgets/layouts/navbar/navbar';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';

const pretendardRegular = localFont({
    src: '../../../public/fonts/Pretendard-Regular.woff',
    variable: '--font-pretendard-regular',
    weight: '700',
});

export const metadata: Metadata = {
    title: 'AutoRep | 깃허브 셋팅에 관한 모든것 ',
    description: '깃허브를 쉽게 시작해봐요!, AutoRep',
    icons: {
        icon: 'favicon.svg',
    },
    openGraph: {
        title: 'AutoRep | 깃허브 셋팅에 관한 모든것',
        siteName: 'AutoRep',
        description: '깃허브를 쉽게 시작해봐요!, AutoRep',
        type: 'website',
        images: ['images/og_image.png'],
        locale: 'ko_KR',
    },
};
export function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <head>
                <Script
                    strategy="afterInteractive"
                    src="https://www.googletagmanager.com/gtag/js?id=G-N5RY7XNQ6H"
                />
                <Script
                    id="google-analytics"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-N5RY7XNQ6H');
                        `,
                    }}
                />
            </head>
            <body
                className={`${pretendardRegular.variable} mx-auto flex w-full flex-col items-center bg-neutral-50 text-center antialiased`}
            >
                <Navbar />
                <div className="mx-auto mt-20 h-screen-vh w-full  mobile:h-screen-lvh">
                    {children}
                </div>
            </body>
        </html>
    );
}
