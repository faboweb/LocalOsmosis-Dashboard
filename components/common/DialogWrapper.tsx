import { Dialog } from '@headlessui/react';
import { Dispatch, FunctionComponent, ReactNode, SetStateAction } from 'react';

type DialogProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	children: ReactNode;
};

export const DialogWrapper: FunctionComponent<DialogProps> = ({ isOpen, setIsOpen, children }) => {
	return (
		<Dialog className="relative z-50" open={isOpen} onClose={() => setIsOpen(false)}>
			{isOpen && (
				<>
					<div
						aria-hidden="true"
						className="pointer-events-none fixed top-0 left-0 z-1 w-full h-full opacity-80 bg-[#282646] blur-sm"
					/>
					<div className="fixed z-10 inset-0 flex items-center justify-center p-2">
						<div className="relative overflow-auto w-[90vw] h-[90vh] p-3 bg-modal rounded-lg rounded-2xl border-enabledGold border">
							<button
								type="button"
								onClick={() => setIsOpen(false)}
								className="fixed z-100 right-[10px] top-[10px] bg-gray-800 hover:opacity-80">
								<img className="w-8 h-8 filter-white" src="/icons/generic/close.svg" />
							</button>
							{children}
						</div>
					</div>
				</>
			)}
		</Dialog>
	);
};
