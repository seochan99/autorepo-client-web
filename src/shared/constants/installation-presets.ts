export const INSTALLATION_PRESETS = {
    react: {
        name: 'React 프로젝트',
        steps: `1. 저장소 복제
\`\`\`bash
git clone [레포지토리 URL]
cd [프로젝트명]
\`\`\`

2. 의존성 설치
\`\`\`bash
npm install
# 또는
yarn install
\`\`\`

3. 개발 서버 실행
\`\`\`bash
npm run dev
# 또는
yarn dev
\`\`\`

4. 빌드
\`\`\`bash
npm run build
# 또는
yarn build
\`\`\``,
    },
    spring: {
        name: 'Spring Boot 프로젝트',
        steps: `1. 저장소 복제
\`\`\`bash
git clone [레포지토리 URL]
cd [프로젝트명]
\`\`\`

2. 프로젝트 빌드
\`\`\`bash
./gradlew build
\`\`\`

3. 애플리케이션 실행
\`\`\`bash
./gradlew bootRun
\`\`\`

4. JAR 파일 실행 (선택사항)
\`\`\`bash
java -jar build/libs/[프로젝트명]-0.0.1-SNAPSHOT.jar
\`\`\``,
    },
    python: {
        name: 'Python 프로젝트',
        steps: `1. 저장소 복제
\`\`\`bash
git clone [레포지토리 URL]
cd [프로젝트명]
\`\`\`

2. 가상환경 생성 및 활성화
\`\`\`bash
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate
\`\`\`

3. 의존성 설치
\`\`\`bash
pip install -r requirements.txt
\`\`\`

4. 애플리케이션 실행
\`\`\`bash
python main.py
\`\`\``,
    },
    docker: {
        name: 'Docker 컨테이너',
        steps: `1. 저장소 복제
\`\`\`bash
git clone [레포지토리 URL]
cd [프로젝트명]
\`\`\`

2. Docker 이미지 빌드
\`\`\`bash
docker build -t [이미지명] .
\`\`\`

3. Docker 컨테이너 실행
\`\`\`bash
docker run -p [포트]:[포트] [이미지명]
\`\`\``,
    },
};
