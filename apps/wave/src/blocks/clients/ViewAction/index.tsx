'use client';

import { useTranslations } from 'next-intl';
import GeneralTabs from './Tabs/GeneralTabs';
import VisitsTabs from './Tabs/VisitsTabs';
import { useCallback, useState } from 'react';
import useNWStore from '~/lib/store';
import { EnumMode } from '~/constants/enums';
import { Dialog, Tabs } from '~/components/dialogs/RightSide';
import Actions from './Actions';

const EditViewAction = () => {
	const t = useTranslations();
	const client = useNWStore((state) => state.clients.active);
	const updateClients = useNWStore((state) => state.updateClients);
	const [mode, setMode] = useState<EnumMode>(EnumMode.VIEW);

	const handleOpenChange = useCallback(
		(open: boolean) => {
			if (!open) {
				setMode(EnumMode.VIEW);
				updateClients({ active: null });
			}
		},
		[updateClients]
	);

	const handleClickByOverlay = useCallback(() => {
		updateClients({ active: null });
	}, [updateClients]);

	const handleChangedMode = useCallback(() => {
		setMode((v) => (v === EnumMode.EDIT ? EnumMode.VIEW : EnumMode.EDIT));
	}, []);

	return (
		<Dialog
			open={!!client}
			handleOpenChange={handleOpenChange}
			handleClickByOverlay={handleClickByOverlay}
			headline={t('page.edit_client.headline')}
			subheadline={t('page.edit_client.subheadline')}
			actions={<Actions mode={mode} changedMode={handleChangedMode} />}
		>
			<Tabs.Root defaultValue='general'>
				<Tabs.List aria-label='Manage your account'>
					<Tabs.Trigger value='general'>
						{t('page.edit_client.tab_general')}
					</Tabs.Trigger>
					<Tabs.Trigger value='visits'>
						{t('page.edit_client.tab_visits')}
					</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value='general'>
					<GeneralTabs mode={mode} />
				</Tabs.Content>
				<Tabs.Content value='visits'>
					<VisitsTabs mode={mode} />
				</Tabs.Content>
			</Tabs.Root>
		</Dialog>
	);
};

export default EditViewAction;
