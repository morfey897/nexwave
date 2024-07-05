import ExpensesChart from '~/components/MockDashboard/ExpensesChart';
import IncomeChart from '~/components/MockDashboard/IncomeChart';
import PieChartLight from '~/components/MockDashboard/PieChartLight';
import PopularChart from '~/components/MockDashboard/PopularChart';
import SeasonChart from '~/components/MockDashboard/SeasonChart';
import InfoBlockCarousel from '~/components/infoblock';
import Wrapper from './wrapper';

export default async function Project() {
	return (
		<Wrapper>
			<InfoBlockCarousel />
			<div className='mt-5'>
				<PieChartLight />
			</div>
			<div className='flex flex-wrap justify-between gap-5'>
				<div className='flex h-1/2 w-full flex-wrap md:flex-nowrap'>
					<IncomeChart />
					<ExpensesChart />
				</div>
				<div className='flex h-1/2 w-full flex-wrap md:flex-nowrap'>
					<SeasonChart />
					<PopularChart />
				</div>
			</div>
		</Wrapper>
	);
}
