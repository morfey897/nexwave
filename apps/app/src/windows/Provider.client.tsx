'use client';
import { createPortal } from 'react-dom';
import { MODALS } from '@/routes';
import {
	ModalProvider,
	useCloseModal,
	useModals,
	useOpenModal,
} from '@nw/modal';
import { S_PARAMS } from '@nw/config';
import AsideSettings from '@/windows/WndPanelSettings';
import AsideProjects from '@/windows/WndPanelProjects';
import CreateProject from '@/windows/WndCreateProject';
import CreateBranch from '@/windows/WndCreateBranch';
import CreateEvent from '@/windows/WndCreateEvent';
import { useCallback, useRef, useEffect, useState } from 'react';
import { encode, decode } from 'js-base64';

const toProps = (base64: string) => {
	try {
		const json = decode(base64);
		return JSON.parse(json);
	} catch (e) {
		return {};
	}
};

const toBase64 = (props: any) => {
	try {
		const json = JSON.stringify(props || {});
		return encode(json);
	} catch (e) {
		return '';
	}
};

const COMPONENTS = {
	[MODALS.SETTINGS]: AsideSettings,
	[MODALS.PROJECTS]: AsideProjects,
	[MODALS.CREATE_PROJECT]: CreateProject,
	[MODALS.CREATE_BRANCH]: CreateBranch,
	[MODALS.CREATE_EVENT]: CreateEvent,
};

function ModalsContainer() {
	// const modals = useModals();
	// const openModal = useOpenModal();
	// const closeModal = useCloseModal();

	const ref = useRef<Element | null>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		ref.current = document.body;
		setMounted(true);
	}, []);

	// useEffect(() => {
	// 	if (!mounted) return;
	// 	const onPopState = () => {
	// 		const url = new URL(window.location.href);
	// 		for (const [name, value] of url.searchParams.entries()) {
	// 			if (name.startsWith(S_PARAMS.DIALOG)) {
	// 				const modalName = name.replace(S_PARAMS.DIALOG, '');
	// 				if (!modals.some((modal) => modal.name === modalName)) {
	// 					openModal(modalName, toProps(value));
	// 				}
	// 			}
	// 		}

	// 		for (const modal of modals) {
	// 			if (!url.searchParams.has(S_PARAMS.DIALOG + modal.name)) {
	// 				closeModal(modal.name);
	// 			}
	// 		}
	// 	};
	// 	window.addEventListener('popstate', onPopState);
	// 	return () => window.removeEventListener('popstate', onPopState);
	// }, [mounted, modals, openModal, closeModal]);

	// // Open modals from URL
	// useEffect(() => {
	// 	if (!mounted) return;
	// 	const url = new URL(window.location.href);

	// 	for (const [name, value] of url.searchParams.entries()) {
	// 		console.log(name, value);
	// 		if (name.startsWith(S_PARAMS.DIALOG)) {
	// 			const modalName = name.replace(S_PARAMS.DIALOG, '');
	// 			openModal(modalName, toProps(value));
	// 		}
	// 	}
	// }, [mounted, openModal]);

	// // Update URL with open modals
	// useEffect(() => {
	// 	if (!mounted) return;
	// 	document.body.style.cssText = modals.length > 0 ? `overflow: hidden;` : ``;

	// 	const { searchParams: clone } = new URL(window.location.href);

	// 	const shouldDelete = Array.from(clone.keys());

	// 	for (const key of shouldDelete) {
	// 		if (key.startsWith(S_PARAMS.DIALOG)) {
	// 			clone.delete(key);
	// 		}
	// 	}

	// 	for (const modal of modals) {
	// 		clone.set(S_PARAMS.DIALOG + modal.name, toBase64(modal.params));
	// 	}

	// 	const str = clone.toString();
	// 	window.history.pushState(null, '', str ? `?${str}` : '');
	// }, [modals, mounted]);

	return mounted && ref.current
		? createPortal(
				<ModalProvider Components={COMPONENTS} data-name='modals' />,
				ref.current,
			)
		: null;
}

export default ModalsContainer;
