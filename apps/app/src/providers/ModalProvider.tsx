'use client';
import {
	useState,
	useEffect,
	useMemo,
	useRef,
	createContext,
	useContext,
} from 'react';
import { useSearchParams } from 'next/navigation';
import { isModalByName, pureModalName } from '@/utils/modal';
import { TModalState } from '@/components/Modal';
import { decodeParams } from '@/utils/modal';

type Unit = TModalState['state'];

const filterModals = (
	modals: Record<string, Unit>,
	from: Unit,
	to: Unit | null,
) =>
	Object.keys(modals).reduce((acc, name) => {
		const state = modals[name];
		if (state === from) {
			if (to === null) {
				delete acc[name];
				acc = {
					...acc,
				};
			} else {
				acc = {
					...acc,
					[name]: to,
				};
			}
		}
		return acc;
	}, modals);

export const ModalContext = createContext<
	Record<string, { state: Unit; params: any }>
>({});

function ModalProvider({
	list,
}: {
	list: Record<string, React.FC<{ name: string }>>;
}) {
	const searchParams = useSearchParams();
	const timers = useRef<Record<string, NodeJS.Timeout>>({});
	const [modalsList, setList] = useState<string[]>([]);
	const [modalProps, setModalProps] = useState<Record<string, any>>({});
	const [modals, setModals] = useState<Record<string, Unit>>({});

	useEffect(() => {
		const newList: Array<string> = [];
		const modalParams: Record<string, any> = {};
		for (const [key, value] of searchParams.entries()) {
			if (isModalByName(key)) {
				const name = pureModalName(key);
				newList.push(name);
				modalParams[name] = decodeParams(value);
			}
		}
		setList(newList);
		setModalProps((params) => ({ ...params, ...modalParams }));
	}, [searchParams]);

	// Initialize mounting and closing state
	useEffect(() => {
		setModals((modals) =>
			[...new Set([...modalsList, ...Object.keys(modals)])].reduce(
				(acc, name) => {
					const state = modals[name];
					const hasList = modalsList.includes(name);
					const hasModals = state === 'mounted' || state === 'open';
					if (hasList && !hasModals) {
						acc = {
							...acc,
							[name]: 'mounted',
						};
					} else if (!hasList && hasModals) {
						acc = {
							...acc,
							[name]: 'closing',
						};
					}
					return acc;
				},
				modals,
			),
		);
	}, [modalsList]);

	// To open state
	useEffect(() => {
		clearTimeout(timers.current['open']);
		timers.current['open'] = setTimeout(() => {
			setModals(filterModals(modals, 'mounted', 'open'));
		}, 10);
	}, [modals]);

	// To close state
	useEffect(() => {
		clearTimeout(timers.current['close']);
		timers.current['close'] = setTimeout(() => {
			setModals(filterModals(modals, 'closing', 'close'));
		}, 300);
	}, [modals]);

	// Unmount
	useEffect(() => {
		if (Object.values(modals).some((state) => state === 'open')) {
			// document.body.classList.add('overflow-hidden', 'h-screen');
		} else {
			console.log('close');
			// document.body.classList.remove('overflow-hidden', 'h-screen');
		}
		setModals(filterModals(modals, 'close', null));
	}, [modals]);

	useEffect(() => {
		return () => {
			Object.values(timers.current).forEach((timer) => clearTimeout(timer));
		};
	}, []);

	const memoModals = useMemo(() => Object.keys(modals), [modals]);

	const modalsValue = useMemo(() => {
		return Object.entries(modals).reduce(
			(acc: Record<string, { state: Unit; params: any }>, [name, state]) => {
				acc[name] = {
					state,
					params: modalProps[name],
				};
				return acc;
			},
			{},
		);
	}, [modalProps, modals]);

	return (
		<ModalContext.Provider value={modalsValue}>
			<div className='absolute' id='modal-provider'>
				{memoModals.map((name) => {
					const Component = list[name];
					return !!Component ? <Component key={name} name={name} /> : null;
				})}
			</div>
		</ModalContext.Provider>
	);
}

export default ModalProvider;
