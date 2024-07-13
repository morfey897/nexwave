'use client';

import * as Form from '@radix-ui/react-form';
import { useTranslations } from 'next-intl';
import ButtonViewEmployee from './ButtonViewEmployee';
import { PersonPic } from '~/components/picture';
import useNWStore from '~/lib/store';
import { fullname } from '~/utils';
import Role from '~/components/roles';
import { format } from 'date-fns';
import { useDateLocale } from '~/hooks/datetime';
import Input from '~/components/form/InputNew';
import Select from 'react-select';
import { SelectSettings } from '~/components/select-settings/SelectSettings';
import { EnumRole, EnumResponseStatus } from '~/constants/enums';
import { useAction } from '~/hooks/action';
import { actionUpdateEmployee } from '~/actions/employee-action';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function GeneralTabs({ mode = 'view' }: { mode?: 'edit' | 'view' }) {
	const t = useTranslations();
	const project = useNWStore((state) => state.project);
	const employee = useNWStore((state) => state.edit.employee);
	const dateLocale = useDateLocale();
	const route = useRouter();

	const { result, pending, action, reset, submit } =
		useAction(actionUpdateEmployee);

	useEffect(() => {
		if (result?.status === EnumResponseStatus.SUCCESS) {
			route.refresh();
		}
	}, [result, route]);

	return (
		<Form.Root action={action} onChange={reset} onSubmit={submit}>
			<div className='bg-secondary flex flex-col'>
				<div className='flex w-auto flex-col space-y-4 md:w-[30rem]'>
					<input type='hidden' name='uuid' value={employee?.uuid || ''} />
					<input type='hidden' name='projectUUID' value={project?.uuid || ''} />
					<div className='flex items-center'>
						<p className='w-1/2'>{t('form.photo')}</p>
						<PersonPic size={20} photo={employee?.avatar} />
					</div>
					{mode === 'view' && (
						<div className='flex items-center'>
							<p className='w-1/2'>{t('form.name')}</p>
							<p className='w-1/2'>{fullname(employee)}</p>
						</div>
					)}
					{mode === 'edit' && (
						<div className='flex items-center'>
							<p className='w-1/2'>{t('form.first_name')}</p>
							<Input name='name' defaultValue={employee?.name || ''} />
						</div>
					)}
					{mode === 'edit' && (
						<div className='flex items-center'>
							<p className='w-1/2'>{t('form.last_name')}</p>
							<Input name='name' defaultValue={employee?.surname || ''} />
						</div>
					)}
					<div className='flex items-center'>
						<p className='w-1/2'>{t('form.phone')}</p>
						{mode === 'view' &&
							(employee?.contacts?.['phone'] ? (
								<a
									href={`tel:${employee?.contacts?.['phone']}`}
									className='w-1/2 text-sm hover:underline'
								>
									{employee?.contacts?.['phone']}
								</a>
							) : (
								<p className='w-1/2'>-</p>
							))}
						{mode === 'edit' && (
							<Input
								name='phone'
								defaultValue={employee?.contacts?.['phone'] || ''}
							/>
						)}
					</div>
					<div className='flex items-center'>
						<p className='w-1/2'>{t('form.email')}</p>
						{mode === 'view' &&
							(employee?.contacts?.['email'] ? (
								<a
									href={`mailto:${employee?.contacts?.['email']}`}
									className='w-1/2 text-sm hover:underline'
								>
									{employee?.contacts?.['email']}
								</a>
							) : (
								<p className='w-1/2'>-</p>
							))}
						{mode === 'edit' && (
							<Input
								name='email'
								defaultValue={employee?.contacts?.['email'] || ''}
							/>
						)}
					</div>

					<div className='flex items-center'>
						<p className='w-1/2'>{t('form.birthday')}</p>
						{mode === 'view' && (
							<p className='w-1/2'>
								{employee?.birthday
									? format(employee.birthday, 'dd MMM yyyy', {
											locale: dateLocale,
										})
									: '-'}
							</p>
						)}
						{mode === 'edit' && (
							<Input
								name='birthday'
								type='date'
								defaultValue={employee?.birthday || ''}
							/>
						)}
					</div>

					<div className='flex items-center'>
						<p className='w-1/2'>{t('page.employees.access')}</p>
						{mode === 'view' && (
							<Role className='w-1/2' role={employee?.role} />
						)}
						{mode === 'edit' && (
							<Select
								name='role'
								options={Object.values(EnumRole).map((role) => ({
									label: t(`crud.role.${role}`),
									value: role,
								}))}
								styles={SelectSettings}
								defaultValue={{
									label: t(`crud.role.${employee?.role}`),
									value: employee?.role,
								}}
								className='mt-1'
								isSearchable={false}
							/>
						)}
					</div>
				</div>
				{mode === 'edit' && <ButtonViewEmployee pending={pending} />}
			</div>
		</Form.Root>
	);
}

export default GeneralTabs;
