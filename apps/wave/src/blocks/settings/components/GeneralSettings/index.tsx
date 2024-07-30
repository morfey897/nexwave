'use client';

import * as Form from '@radix-ui/react-form';
import Button from '~/components/controls/Button';
import ColorThemeBlock from './ColorThemeBlock';
import InfoBlock from './InfoBlock';
import PhotosBlock from './PhotosBlock';
import WorkTimeBlock from './WorkTimeBlock';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { EnumResponseStatus } from '~/constants/enums';
import { useAction } from '~/hooks/action';
import { useRouter } from 'next/navigation';
import { actionUpdateProject } from '~/actions/project-action';
import Spinner from '~/components/spinner';
import useNWStore from '~/lib/store';

const GeneralSettings = () => {
	const t = useTranslations();

	const project = useNWStore((state) => state.project);
	const route = useRouter();

	const { result, pending, formProps } = useAction(actionUpdateProject);

	useEffect(() => {
		if (result?.status === EnumResponseStatus.SUCCESS) {
			// TODO: Fix this
			window.location.reload();
		}
	}, [result, route, project]);

	return (
		<Form.Root {...formProps}>
			<input type='hidden' name='uuid' value={project?.uuid || ''} />
			<div className='flex flex-col gap-5'>
				<span className='font-inter text-xl font-semibold leading-7'>
					{t('page.settings.tab_general')}
				</span>
				<div className='flex flex-col gap-32 md:flex-row'>
					<div className='flex flex-col'>
						<InfoBlock />
						<WorkTimeBlock />
					</div>
					<div className='flex flex-col'>
						<PhotosBlock />
						<ColorThemeBlock />
					</div>
				</div>
				<div className='flex justify-end'>
					<div className='flex flex-row gap-2'>
						<div className='w-[108px]'>
							<Button message={t('button.cancel')} disabled={pending} />
						</div>
						<div className='w-[94px]'>
							<Button
								type='submit'
								disabled={pending}
								message={t('button.save')}
								variant='primary'
								icon={pending ? <Spinner /> : undefined}
							/>
						</div>
					</div>
				</div>
			</div>
		</Form.Root>
	);
};

export default GeneralSettings;
