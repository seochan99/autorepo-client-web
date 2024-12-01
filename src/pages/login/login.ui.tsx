import { ReactElement } from 'react';

const LoginPage = (): ReactElement => {
    const githubAuthUrl =
        'https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI';

    return (
        <div className="mx-auto h-lvh w-4/5 mt-20 flex flex-col items-center space-y-8">
            <h1 className="text-4xl font-bold text-netural-900 text-center mb-8">
                GitHub 로그인
            </h1>
            <p className="text-gray-600 text-center mb-6">
                AutoRep에 로그인하려면 GitHub 계정으로 로그인하세요.
            </p>
            <a
                href={githubAuthUrl}
                className="bg-black text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 transition duration-300 flex items-center space-x-2"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.489.5.091.683-.217.683-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.22-.253-4.555-1.11-4.555-4.944 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.563 9.563 0 0112 6.843a9.563 9.563 0 012.502.338c1.91-1.294 2.75-1.025 2.75-1.025.544 1.378.201 2.397.099 2.65.64.7 1.028 1.592 1.028 2.683 0 3.842-2.338 4.687-4.566 4.936.36.31.678.922.678 1.855 0 1.338-.012 2.42-.012 2.75 0 .268.18.576.688.479C19.137 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                        clipRule="evenodd"
                    />
                </svg>
                <span>GitHub로 로그인하기</span>
            </a>
        </div>
    );
};

export default LoginPage;
