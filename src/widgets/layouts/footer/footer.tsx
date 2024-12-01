import Separator from '@shared/components/common/separator';
import { IconInstagram, IconKakao } from 'public/svgs';

export default function Footer() {
    return (
        <footer className="w-full bg-neutral-100 p-8 text-neutral-500">
            <div className="mx-auto flex w-full flex-col items-center justify-between gap-4 desktop:flex-row desktop:items-start">
                <div className="text-center text-sub3 leading-relaxed desktop:text-left">
                    {/* Logo */}
                    <div className="flex flex-col gap-1">
                        <p>text</p>
                        <p>text</p>
                        <p>text</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3 self-center">
                    <a
                        href=""
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center rounded-md border bg-white px-6 py-3 text-sub2 text-neutral-700 transition duration-200 ease-in-out hover:bg-neutral-50"
                    >
                        <IconKakao className="mr-2" />
                        카카오톡 문의
                    </a>
                    <a
                        href=""
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center rounded-md border bg-white px-6 py-3 text-sub2 text-neutral-700 transition duration-200 ease-in-out hover:bg-neutral-50"
                    >
                        <IconInstagram className="mr-2" />
                        AutoRep 인스타그램
                    </a>
                </div>
            </div>
        </footer>
    );
}
