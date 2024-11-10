import '../src/app/styles/reset.css';
import '../src/app/styles/globals.css';

import localFont from 'next/font/local';

export const metadata = {
    title: 'AutoRepo',
    description: '레포를 쉽고 편하게 만들어봐요, 오토레포',
    icon: './favicon.ico',
    openGraph: {
        title: 'AutoRepo',
        siteName: 'AutoRepo',
        description: '레포를 쉽고 편하게 만들어봐요, 오토레포',
        type: 'website',
        url: 'https://autoRepo.com',
        // images: ['/images/og_image.png'],
        locale: 'ko_KR',
    },
};

const pretendardRegular = localFont({
    src: '/fonts/Pretendard-Regular.woff',
    variable: '--font-pretendard-regular',
    weight: '700',
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body
                className={`${pretendardRegular.variable} bg-neutral-100 antialiased w-4/5 mx-auto flex flex-col items-center text-center mt-10`}
            >
                {children}
            </body>
        </html>
    );
}
