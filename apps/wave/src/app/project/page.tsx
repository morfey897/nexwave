import { Container, Flex, Text, Skeleton } from '@radix-ui/themes';
import ExpensesChart from '~root/components/MockDashboard/ExpensesChart';
import IncomeChart from '~root/components/MockDashboard/IncomeChart';
import PieChartDark from '~root/components/MockDashboard/PieChartDark';
import PieChartLight from '~root/components/MockDashboard/PieChartLight';
import PopularChart from '~root/components/MockDashboard/PopularChart';
import SeasonChart from '~root/components/MockDashboard/SeasonChart';
import InfoBlockCarousel from '~root/components/infoblock';
import InfoBlock from '~root/components/infoblock';
import ArrowUp from '~root/icons/ArrowUp';
import EllipsisIcon from '~root/icons/ElipsisIcon';
import PiggyIcon from '~root/icons/PiggyIcon';
import SidebarMockIcon from '~root/icons/SidebarMockIcon';

export default async function Project() {
	// return (
	// <h2>
	// 	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
	// 	felis tellus, efficitur id convallis a, viverra eget libero. Nam magna
	// 	erat, fringilla sed commodo sed, aliquet nec magna. Lorem ipsum dolor sit
	// 	amet, consectetur adipiscing elit. Pellentesque felis tellus, efficitur id
	// 	convallis a, viverra eget libero. Nam magna erat, fringilla sed commodo
	// 	sed, aliquet nec magna. Lorem ipsum dolor sit amet, consectetur adipiscing
	// 	elit. Pellentesque felis tellus, efficitur id convallis a, viverra eget
	// 	libero. Nam magna erat, fringilla sed commodo sed, aliquet nec magna.
	// 	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
	// 	felis tellus, efficitur id convallis a, viverra eget libero. Nam magna
	// 	erat, fringilla sed commodo sed, aliquet nec magna. Lorem ipsum dolor sit
	// 	amet, consectetur adipiscing elit. Pellentesque felis tellus, efficitur id
	// 	convallis a, viverra eget libero. Nam magna erat, fringilla sed commodo
	// 	sed, aliquet nec magna. Lorem ipsum dolor sit amet, consectetur adipiscing
	// 	elit. Pellentesque felis tellus, efficitur id convallis a, viverra eget
	// 	libero. Nam magna erat, fringilla sed commodo sed, aliquet nec magna.
	// 	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
	// 	felis tellus, efficitur id convallis a, viverra eget libero. Nam magna
	// 	erat, fringilla sed commodo sed, aliquet nec magna. Lorem ipsum dolor sit
	// 	amet, consectetur adipiscing elit. Pellentesque felis tellus, efficitur id
	// 	convallis a, viverra eget libero. Nam magna erat, fringilla sed commodo
	// 	sed, aliquet nec magna. Lorem ipsum dolor sit amet, consectetur adipiscing
	// 	elit. Pellentesque felis tellus, efficitur id convallis a, viverra eget
	// 	libero. Nam magna erat, fringilla sed commodo sed, aliquet nec magna.
	// 	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
	// 	felis tellus, efficitur id convallis a, viverra eget libero. Nam magna
	// 	erat, fringilla sed commodo sed, aliquet nec magna. Lorem ipsum dolor sit
	// 	amet, consectetur adipiscing elit. Pellentesque felis tellus, efficitur id
	// 	convallis a, viverra eget libero. Nam magna erat, fringilla sed commodo
	// 	sed, aliquet nec magna. Lorem ipsum dolor sit amet, consectetur adipiscing
	// 	elit. Pellentesque felis tellus, efficitur id convallis a, viverra eget
	// 	libero. Nam magna erat, fringilla sed commodo sed, aliquet nec magna.
	// </h2>
	// );
	return (
		<>
			<InfoBlockCarousel />
			<div className='mt-5'>
				<PieChartLight />
			</div>
			<div className='flex flex-wrap justify-between gap-5'>
				<IncomeChart />
				<ExpensesChart />
				<SeasonChart />
				<PopularChart />
			</div>
		</>
	);
}
