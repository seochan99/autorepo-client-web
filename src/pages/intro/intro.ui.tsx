import { ReactElement } from 'react';

const IntroPage = (): ReactElement => {
    return (
        <div className="mx-auto w-4/5 mt-10 p-8 bg-white border border-gray-300  space-y-8">
            <h1 className="text-4xl font-bold text-primary-600 text-center animate-bounce">
                🚀 AutoRep 레포지토리 소개 🚀
            </h1>
            <p className="text-lg text-gray-600 text-center">
                AutoRep 레포지토리의 기능과 목적을 살펴보고, 개발 효율성을
                높이세요!
            </p>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary-500">
                    📄 레포지토리 설명
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    AutoRep 레포지토리는 프로젝트 문서를 자동으로 생성하고
                    관리할 수 있게 도와주는 레포지토리입니다. AI 기반 도구를
                    활용하여 문서화 워크플로우를 간소화하며, 개발자들이 코드
                    작성에 집중할 수 있도록 돕습니다.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary-500">
                    ✨ 주요 기능
                </h2>

                <p>레포지토리 내용을 기반으로 자동 README 생성</p>
                <p>프로젝트에 맞는 커스터마이징 가능한 템플릿 제공</p>
                <p>GitHub와의 연동으로 메타데이터 자동 불러오기</p>
                <p>다국어 지원 및 다양한 서식 옵션 제공</p>
                <p>실시간 미리보기 및 편집 기능 지원</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary-500">
                    🚀 시작하기
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    AutoRep을 사용하려면 GitHub 계정을 연결하고 원하는
                    레포지토리를 선택하세요. AutoRep이 자동으로 초기 README
                    파일을 생성해주며, 이후 자유롭게 커스터마이징할 수 있습니다.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary-500">
                    📚 추가 리소스
                </h2>

                <p>
                    <a
                        href="/docs"
                        className="text-primary-600 hover:underpne hover:animate-pulse"
                    >
                        📘 문서
                    </a>{' '}
                    - AutoRep의 기능과 설정 방법을 자세히 알아보세요.
                </p>
                <p>
                    <a
                        href="/support"
                        className="text-primary-600 hover:underpne hover:animate-pulse"
                    >
                        🛠️ 지원
                    </a>{' '}
                    - 지원팀에게 도움을 받거나 커뮤니티 포럼에 참여하세요.
                </p>
                <p>
                    <a
                        href="/contact"
                        className="text-primary-600 hover:underpne hover:animate-pulse"
                    >
                        📞 연락하기
                    </a>{' '}
                    - 더 많은 정보나 파트너십에 대해 문의해 주세요.
                </p>
            </section>

            <footer className="text-center mt-8 text-gray-500">
                &copy; {new Date().getFullYear()} AutoRep. 모든 권리 보유.
            </footer>
        </div>
    );
};

export default IntroPage;
