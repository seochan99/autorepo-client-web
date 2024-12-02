import { motion } from 'framer-motion';
interface LoadingModalProps {
    isOpen: boolean;
}

export const LoadingModal = ({ isOpen }: LoadingModalProps) => {
    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
            {/* ... 로딩 모달 내용 ... */}
        </motion.div>
    );
};
