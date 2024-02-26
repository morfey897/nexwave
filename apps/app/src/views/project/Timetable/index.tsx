import Container from '@/components/Containers';
import { EnumDeviceType } from '@/enums';

import {
	useMessages,
	NextIntlClientProvider,
	useTranslations,
} from 'next-intl';
import { pick } from 'lodash';

import Caption from './Caption.client';
import Header from './Header.client';
import Body from './Body.client';

function TimetableView({ device }: { device?: EnumDeviceType }) {
	const t = useTranslations();
	const messages = useMessages();
	const filterMessages = pick(messages, ['filter', 'day']);
	const bodyMessages = pick(messages, ['page.access_denied']);

	return (
		<Container className='mb-12'>
			<Caption
				headline={t('page.timetable.headline')}
				subheadline={t('page.timetable.subheadline')}
				add={t('button.add')}
				// activeTab={activeTab}
			/>
			<NextIntlClientProvider messages={filterMessages}>
				<Header device={device} />
			</NextIntlClientProvider>
			<NextIntlClientProvider messages={bodyMessages}>
				<Body device={device} />
			</NextIntlClientProvider>
			{/* <ContainerBody>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
					bibendum libero mattis semper cursus. Quisque et facilisis magna.
					Curabitur velit elit, lacinia eget mattis vulputate, porta eget felis.
					Fusce sed est leo. Nam id metus ut justo congue molestie vitae vitae
					magna. Sed dignissim efficitur velit, quis tincidunt ante egestas vel.
					Donec feugiat magna at sem venenatis bibendum. Maecenas eget rhoncus
					mi. Nullam ornare elit neque, et dapibus neque posuere sed. Integer at
					bibendum turpis. Curabitur ullamcorper arcu a sem lacinia lacinia. Sed
					mollis nulla nec odio luctus condimentum. Aenean vitae mollis orci.
					Nunc iaculis tincidunt leo ac accumsan. Suspendisse justo dui,
					imperdiet eu elit et, semper mattis libero. Cras dictum sem a tellus
					commodo, sed fringilla ex scelerisque. Nunc dolor nisl, placerat et
					arcu nec, suscipit rhoncus urna. Curabitur ultrices rhoncus mi sit
					amet sollicitudin. Suspendisse enim eros, consequat a libero sit amet,
					pulvinar ornare erat. Nulla tellus ex, bibendum et vehicula ac, congue
					quis ipsum. Aenean viverra dolor id ex egestas laoreet a vitae nunc.
					Cras erat augue, sagittis id turpis et, convallis placerat arcu. Sed
					eget egestas libero. Mauris et justo maximus, eleifend est at,
					elementum orci. Donec sodales ipsum ut congue ultricies. Nullam
					faucibus ante nulla, semper gravida dolor gravida vitae. Cras
					convallis malesuada turpis, non lobortis purus lacinia vel. Praesent
					ac nisl tincidunt, feugiat purus eget, cursus nisi. Curabitur molestie
					fringilla lorem, vel dictum justo imperdiet id. Fusce id aliquet
					nulla. Quisque fringilla est a pellentesque finibus. Etiam at
					tristique massa. Pellentesque at elit ut dui interdum pharetra.
					Vivamus tempor augue neque, et condimentum lectus varius vitae. Ut
					tincidunt, neque eu ullamcorper tincidunt, nunc neque euismod sapien,
					in ultrices justo arcu in odio. Sed ex mauris, faucibus vitae dolor
					vel, gravida aliquam arcu. Nunc nec suscipit orci. Nulla facilisi.
					Nullam condimentum metus non laoreet pharetra. Suspendisse sit amet
					nisl tellus. Ut eu commodo justo. Donec non maximus elit. Proin arcu
					nulla, mollis a varius sed, maximus ac massa. Fusce odio est, faucibus
					et purus varius, lobortis feugiat felis. Vivamus eu nisl ac mauris
					interdum porttitor. Phasellus semper urna a viverra pulvinar. Morbi
					mattis lobortis metus. Nulla molestie sem quis tempus ullamcorper.
					Curabitur faucibus mi ac odio iaculis ultricies ut ut odio. Curabitur
					sollicitudin odio id nunc egestas porttitor. In venenatis malesuada
					urna at tincidunt. Nunc semper elit eget enim accumsan, id dictum quam
					dictum. Mauris interdum vel eros eget maximus. Sed vulputate diam id
					rhoncus dignissim.
				</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
					bibendum libero mattis semper cursus. Quisque et facilisis magna.
					Curabitur velit elit, lacinia eget mattis vulputate, porta eget felis.
					Fusce sed est leo. Nam id metus ut justo congue molestie vitae vitae
					magna. Sed dignissim efficitur velit, quis tincidunt ante egestas vel.
					Donec feugiat magna at sem venenatis bibendum. Maecenas eget rhoncus
					mi. Nullam ornare elit neque, et dapibus neque posuere sed. Integer at
					bibendum turpis. Curabitur ullamcorper arcu a sem lacinia lacinia. Sed
					mollis nulla nec odio luctus condimentum. Aenean vitae mollis orci.
					Nunc iaculis tincidunt leo ac accumsan. Suspendisse justo dui,
					imperdiet eu elit et, semper mattis libero. Cras dictum sem a tellus
					commodo, sed fringilla ex scelerisque. Nunc dolor nisl, placerat et
					arcu nec, suscipit rhoncus urna. Curabitur ultrices rhoncus mi sit
					amet sollicitudin. Suspendisse enim eros, consequat a libero sit amet,
					pulvinar ornare erat. Nulla tellus ex, bibendum et vehicula ac, congue
					quis ipsum. Aenean viverra dolor id ex egestas laoreet a vitae nunc.
					Cras erat augue, sagittis id turpis et, convallis placerat arcu. Sed
					eget egestas libero. Mauris et justo maximus, eleifend est at,
					elementum orci. Donec sodales ipsum ut congue ultricies. Nullam
					faucibus ante nulla, semper gravida dolor gravida vitae. Cras
					convallis malesuada turpis, non lobortis purus lacinia vel. Praesent
					ac nisl tincidunt, feugiat purus eget, cursus nisi. Curabitur molestie
					fringilla lorem, vel dictum justo imperdiet id. Fusce id aliquet
					nulla. Quisque fringilla est a pellentesque finibus. Etiam at
					tristique massa. Pellentesque at elit ut dui interdum pharetra.
					Vivamus tempor augue neque, et condimentum lectus varius vitae. Ut
					tincidunt, neque eu ullamcorper tincidunt, nunc neque euismod sapien,
					in ultrices justo arcu in odio. Sed ex mauris, faucibus vitae dolor
					vel, gravida aliquam arcu. Nunc nec suscipit orci. Nulla facilisi.
					Nullam condimentum metus non laoreet pharetra. Suspendisse sit amet
					nisl tellus. Ut eu commodo justo. Donec non maximus elit. Proin arcu
					nulla, mollis a varius sed, maximus ac massa. Fusce odio est, faucibus
					et purus varius, lobortis feugiat felis. Vivamus eu nisl ac mauris
					interdum porttitor. Phasellus semper urna a viverra pulvinar. Morbi
					mattis lobortis metus. Nulla molestie sem quis tempus ullamcorper.
					Curabitur faucibus mi ac odio iaculis ultricies ut ut odio. Curabitur
					sollicitudin odio id nunc egestas porttitor. In venenatis malesuada
					urna at tincidunt. Nunc semper elit eget enim accumsan, id dictum quam
					dictum. Mauris interdum vel eros eget maximus. Sed vulputate diam id
					rhoncus dignissim.
				</p>
			</ContainerBody> */}
		</Container>
	);

	// 	return (
	// 		<Container className='overflow-x-clip'>
	// 			<ContainerHeader className='sticky'>
	// 				<div className='bg-gray-100 dark:bg-gray-900 pt-2'>
	// 					<Caption
	// 						headline={t('page.timetable.headline')}
	// 						subheadline={t('page.timetable.subheadline')}
	// 						amount={0}
	// 						add={{
	// 							title: t('button.add'),
	// 							onClick: () => {
	// 								console.log('onAdd');
	// 							},
	// 						}}
	// 					/>
	// 					<div
	// 						className={clsx(
	// 							'mt-4 flex pb-8 gap-2 items-center justify-between justify-items-center transition-all duration-100 ease-linear',
	// 							'flex-wrap',
	// 							isScrolled && '!pb-0',
	// 						)}
	// 					>
	// 						<Filter
	// 							as='dropdown'
	// 							className='flex shrink-0 order-1'
	// 							icon={<HiOutlineFilter size={16} />}
	// 							message={t('filter.of_state_', { state })}
	// 							filters={states}
	// 							onChange={onFilter}
	// 							value={state}
	// 						/>
	// 						<ChangeDate
	// 							onChange={(index: number) =>
	// 								onDay(index * (period === EnumPeriod.WEEK ? 7 : 1))
	// 							}
	// 							dates={[getDates[0], getDates[getDates.length - 1]]}
	// 							className='order-last md:order-2 md:w-auto w-full'
	// 						/>
	// 						<Filter
	// 							as='auto:md'
	// 							className='flex shrink-0 order-3'
	// 							icon={<HiOutlineViewGrid size={16} />}
	// 							message={t('filter.of_period_', { period })}
	// 							filters={periods}
	// 							onChange={onView}
	// 							value={period}
	// 						/>
	// 					</div>
	// 				</div>

	// 				<ContainerScrollableHeader ref={refHeader} onScroll={onScroll}>
	// 					<WeekCalendarHead
	// 						className={clsx(
	// 							'bg-gray-50 dark:bg-gray-800',
	// 							'border border-gray-200 dark:border-gray-700 border-b-0 rounded-t-md md:rounded-t-lg',
	// 							'w-full',
	// 							period === EnumPeriod.WEEK && 'min-w-[600px]',
	// 						)}
	// 						dates={getDates}
	// 					/>
	// 				</ContainerScrollableHeader>
	// 			</ContainerHeader>
	// 			<ContainerBody ref={refBody} onScroll={onScroll}>
	// 				<WeekCalendarBody
	// 					className={clsx(
	// 						'bg-white dark:bg-gray-900',
	// 						'border border-gray-200 dark:border-gray-700 border-b-0 rounded-b-md md:rounded-b-lg',
	// 						'w-full',
	// 						period === EnumPeriod.WEEK && 'min-w-[600px]',
	// 					)}
	// 					dates={getDates}
	// 					events={getEvents}
	// 					Generator={EventGenerator}
	// 					cellHeight={cellHeight}
	// 					timeStep={timeStep}
	// 				/>
	// 			</ContainerBody>
	// 		</Container>
	// 	);
}

export default TimetableView;
