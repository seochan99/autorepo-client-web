import { HomeText } from 'public/svgs';
import { ReactElement } from 'react';

const HomePage = (): ReactElement => {
    return (
        <div className="mx-auto h-lvh ">
            <HomeText className="mx-auto mt-32" />
            <div className="flex flex-row items-center justify-center mt-8">
                {/* 바로 시작하기 버튼 */}
                <button className="mx-2 px-6 py-3 bg-black text-white rounded-md">
                    바로 시작하기
                </button>
                {/* 템플릿 구경하기 버튼 */}
                <button className="mx-2 px-6 py-3 bg-black text-white rounded-md">
                    템플릿 구경하기
                </button>
            </div>
            {/* 이미지 캐러셀 */}
            <div className="mt-16 overflow-hidden ">
                <div className="flex w-[calc(400px * 10 + 16rem)] animate-scroll gap-8 w-full">
                    {/* 이미지 리스트 */}
                    {Array(3)
                        .fill([
                            'image1.png',
                            'image2.png',
                            'image3.png',
                            'image4.png',
                            'image5.png',
                        ])
                        .flat()
                        .map((imageName, index) => (
                            <img
                                key={index}
                                src={`images/${imageName}`}
                                alt={`Image ${index + 1}`}
                                className="w-[400px] h-[300px] object-cover"
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
