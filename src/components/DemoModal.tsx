import { Modal } from './shared';

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DemoModal({ open, onClose }: DemoModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <p className="text-sm text-[#8a8a8a] mb-4">This is a demo. No downloads or checkout are enabled.</p>
      <button
        onClick={onClose}
        className="w-full bg-lime text-page text-[13px] font-semibold py-2.5 rounded-md hover:opacity-90 transition-opacity"
      >
        Close
      </button>
    </Modal>
  );
}
