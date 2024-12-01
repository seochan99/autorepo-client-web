'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ReactElement, useState } from 'react';

import { INSTALLATION_PRESETS } from '@/shared/constants/installation-presets';

interface TechStack {
    name: string;
    color: string;
    icon: string;
}

interface TeamMember {
    name: string;
    role: string;
}

interface ReadMeForm {
    title: string;
    description: string;
    stack: TechStack[];
    teamMembers: TeamMember[];
    installation: string;
}

// 자주 사용되는 기술 스택 프리셋
const TECH_PRESETS = [
    { name: 'React', color: '61DAFB', icon: 'react' },
    { name: 'TypeScript', color: '3178C6', icon: 'typescript' },
    { name: 'JavaScript', color: 'F7DF1E', icon: 'javascript' },
    { name: 'Next.js', color: '000000', icon: 'nextdotjs' },
    { name: 'Node.js', color: '339933', icon: 'nodedotjs' },
    { name: 'HTML5', color: 'E34F26', icon: 'html5' },
    { name: 'CSS3', color: '1572B6', icon: 'css3' },
    { name: 'Python', color: '3776AB', icon: 'python' },
    { name: 'Java', color: '007396', icon: 'java' },
    { name: 'Spring', color: '6DB33F', icon: 'spring' },
];

const ReadMePage = (): ReactElement => {
    const router = useRouter();
    const [formData, setFormData] = useState<ReadMeForm>({
        title: '',
        description: '',
        stack: [],
        teamMembers: [],
        installation: '',
    });
    const [newStack, setNewStack] = useState('');
    const [newMember, setNewMember] = useState({ name: '', role: '' });
    const [customStackInput, setCustomStackInput] = useState({
        name: '',
        color: '',
        icon: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // 에디터 페이지로 이동하면서 데이터 전달
            const queryParams = new URLSearchParams({
                formData: JSON.stringify(formData),
                repoUrl:
                    new URLSearchParams(window.location.search).get(
                        'repoUrl',
                    ) || '',
            });

            router.push(`/read-me-editor?${queryParams.toString()}`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const addStack = () => {
        if (newStack.trim()) {
            const stack: TechStack = {
                name: newStack.trim(),
                icon: newStack.toLowerCase(),
                color: '000000', // 기본 검정색
            };
            setFormData({
                ...formData,
                stack: [...formData.stack, stack],
            });
            setNewStack('');
        }
    };

    const removeStack = (index: number) => {
        setFormData({
            ...formData,
            stack: formData.stack.filter((_, i) => i !== index),
        });
    };

    const addTeamMember = () => {
        if (newMember.name.trim() && newMember.role.trim()) {
            setFormData({
                ...formData,
                teamMembers: [...formData.teamMembers, { ...newMember }],
            });
            setNewMember({ name: '', role: '' });
        }
    };

    const removeTeamMember = (index: number) => {
        setFormData({
            ...formData,
            teamMembers: formData.teamMembers.filter((_, i) => i !== index),
        });
    };

    const addPresetStack = (preset: TechStack) => {
        if (!formData.stack.some((s) => s.name === preset.name)) {
            setFormData({
                ...formData,
                stack: [...formData.stack, preset],
            });
        }
    };

    const getBadgeUrl = (stack: TechStack) => {
        return `https://img.shields.io/badge/${stack.name}-${stack.color}?style=for-the-badge&logo=${stack.icon}&logoColor=white`;
    };

    const addCustomStack = () => {
        if (customStackInput.name && customStackInput.icon) {
            const newStack: TechStack = {
                name: customStackInput.name,
                icon: customStackInput.icon.toLowerCase(),
                color: customStackInput.color || '000000', // 기본값 검정
            };

            setFormData({
                ...formData,
                stack: [...formData.stack, newStack],
            });
            setCustomStackInput({ name: '', color: '', icon: '' });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-w-5xl px-6 py-12"
        >
            <motion.form
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-8"
            >
                {/* 프로젝트 제목 */}
                <div>
                    <label
                        className="mb-3 block text-lg font-medium text-gray-700"
                        htmlFor="title"
                    >
                        프로젝트 제목
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full rounded-lg border border-gray-300 p-4 text-lg focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        placeholder="프로젝트 이름을 입력하세요"
                    />
                </div>

                {/* 프로젝트 설명 */}
                <div>
                    <label
                        className="mb-3 block text-lg font-medium text-gray-700"
                        htmlFor="description"
                    >
                        프로젝트 설명
                    </label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                        className="h-40 w-full rounded-lg border border-gray-300 p-4 text-lg focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        placeholder="프로젝트에 대한 설명을 입력하세요"
                    />
                </div>

                {/* 기술 스택 */}
                <div>
                    <label className="mb-3 block text-lg font-medium text-gray-700">
                        기술 스택
                    </label>
                    <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {TECH_PRESETS.map((preset) => (
                            <button
                                key={preset.name}
                                type="button"
                                onClick={() => addPresetStack(preset)}
                                className="flex items-center justify-center rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                            >
                                <img
                                    src={getBadgeUrl(preset)}
                                    alt={preset.name}
                                    className="h-8"
                                />
                            </button>
                        ))}
                    </div>
                    <div className="mb-4 rounded-lg border border-gray-200 p-4">
                        <h3 className="mb-3 text-lg font-medium">
                            커스텀 기술 스택 추가
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <input
                                type="text"
                                value={customStackInput.name}
                                onChange={(e) =>
                                    setCustomStackInput({
                                        ...customStackInput,
                                        name: e.target.value,
                                    })
                                }
                                placeholder="기술 이름 (예: Docker)"
                                className="rounded-lg border border-gray-300 p-3 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            />
                            <input
                                type="text"
                                value={customStackInput.icon}
                                onChange={(e) =>
                                    setCustomStackInput({
                                        ...customStackInput,
                                        icon: e.target.value,
                                    })
                                }
                                placeholder="아이콘 이름 (예: docker)"
                                className="rounded-lg border border-gray-300 p-3 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            />
                            <input
                                type="text"
                                value={customStackInput.color}
                                onChange={(e) =>
                                    setCustomStackInput({
                                        ...customStackInput,
                                        color: e.target.value.replace('#', ''),
                                    })
                                }
                                maxLength={6}
                                placeholder="색상 코드 (예: 2496ED)"
                                className="rounded-lg border border-gray-300 p-3 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            />
                        </div>
                        <div className="mt-3 flex justify-end">
                            <button
                                type="button"
                                onClick={addCustomStack}
                                className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
                            >
                                추가하기
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.stack.map((tech, index) => (
                            <div key={index} className="group relative">
                                <img
                                    src={getBadgeUrl(tech)}
                                    alt={tech.name}
                                    className="h-8"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeStack(index)}
                                    className="absolute -right-2 -top-2 hidden size-6 items-center justify-center rounded-full bg-red-500 text-white group-hover:flex"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 팀 멤버 섹션 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4"
                >
                    <label className="mb-3 block text-lg font-medium text-gray-700">
                        팀 멤버
                    </label>
                    <div className="grid gap-4 sm:grid-cols-12">
                        <div className="sm:col-span-5">
                            <input
                                type="text"
                                value={newMember.name}
                                onChange={(e) =>
                                    setNewMember({
                                        ...newMember,
                                        name: e.target.value,
                                    })
                                }
                                placeholder="이름"
                                className="w-full rounded-lg border border-gray-300 p-3 text-lg focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            />
                        </div>
                        <div className="sm:col-span-5">
                            <input
                                type="text"
                                value={newMember.role}
                                onChange={(e) =>
                                    setNewMember({
                                        ...newMember,
                                        role: e.target.value,
                                    })
                                }
                                placeholder="역할 (예: Frontend Developer)"
                                className="w-full rounded-lg border border-gray-300 p-3 text-lg focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={addTeamMember}
                            className="flex items-center justify-center rounded-lg bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800 sm:col-span-2"
                        >
                            추가
                        </motion.button>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                        {formData.teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="group relative inline-flex items-center rounded-lg bg-gray-100 px-4 py-2"
                            >
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-900">
                                        {member.name}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        {member.role}
                                    </span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    type="button"
                                    onClick={() => removeTeamMember(index)}
                                    className="ml-3 flex size-6 items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-red-500 hover:text-white"
                                >
                                    ×
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* 설치 방법 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                >
                    <label className="mb-3 block text-lg font-medium text-gray-700">
                        설치 방법
                    </label>

                    {/* 프리셋 선택 */}
                    <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {Object.entries(INSTALLATION_PRESETS).map(
                            ([key, preset]) => (
                                <motion.button
                                    key={key}
                                    type="button"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            installation: preset.steps,
                                        })
                                    }
                                    className="rounded-lg border border-gray-200 p-3 text-sm hover:bg-gray-50"
                                >
                                    {preset.name}
                                </motion.button>
                            ),
                        )}
                    </div>

                    <div className="space-y-2">
                        <textarea
                            value={formData.installation}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    installation: e.target.value,
                                })
                            }
                            className="h-80 w-full rounded-lg border border-gray-300 p-4 font-mono text-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            placeholder="설치 방법을 입력하거나 위의 프리셋을 선택하세요."
                        />
                    </div>
                </motion.div>

                {/* 제출 버튼 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-end pt-6"
                >
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="rounded-lg bg-neutral-900 px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-neutral-800"
                    >
                        README 생성하기
                    </motion.button>
                </motion.div>
            </motion.form>
        </motion.div>
    );
};

export default ReadMePage;
