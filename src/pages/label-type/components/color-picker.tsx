import { HexColorPicker } from 'react-colorful';
import { FiRefreshCw } from 'react-icons/fi';

import { Label } from '@/types/label';
import { generateRandomColor } from '@/utils/color';

interface ColorPickerProps {
    color: string;
    index: number;
    activeColorPicker: number | null;
    setActiveColorPicker: (index: number | null) => void;
    updateLabel: (index: number, field: keyof Label, value: string) => void;
}

export const ColorPicker = ({
    color,
    index,
    activeColorPicker,
    setActiveColorPicker,
    updateLabel,
}: ColorPickerProps) => {
    return (
        <div className="relative">
            <button
                type="button"
                onClick={() =>
                    setActiveColorPicker(
                        activeColorPicker === index ? null : index,
                    )
                }
                className="flex items-center gap-2 rounded-lg border border-gray-200 p-2 hover:border-gray-300"
            >
                <div
                    className="size-6 rounded-md"
                    style={{ backgroundColor: color }}
                />
                <span className="text-sm font-medium">
                    {color.toUpperCase()}
                </span>
                <FiRefreshCw
                    className="ml-1 text-gray-400 hover:text-gray-600"
                    onClick={(e) => {
                        e.stopPropagation();
                        updateLabel(index, 'color', generateRandomColor());
                    }}
                />
            </button>

            {activeColorPicker === index && (
                <div className="absolute left-0 top-full z-10 mt-2">
                    <div className="rounded-lg bg-white p-3 shadow-xl">
                        <HexColorPicker
                            color={color}
                            onChange={(newColor) =>
                                updateLabel(index, 'color', newColor)
                            }
                        />
                        <div className="mt-3 flex items-center gap-2">
                            {/* ... 나머지 컬러 피커 UI ... */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
