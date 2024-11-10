const NotFoundPage = () => {
    return (
        <div className="mx-5 flex h-[90%] flex-col items-center justify-center">
            <div className="text-2xl font-bold text-green-500">NOT FOUND!</div>
            <div className="text-center text-base font-normal leading-6 text-gray-600">
                요청하신 페이지를 찾을 수 없습니다.
                <br />
                입력하신 주소가 정확한지 확인해주세요.
            </div>
        </div>
    );
};

export default NotFoundPage;
