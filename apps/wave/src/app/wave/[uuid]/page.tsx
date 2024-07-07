import ExpensesChart from '~/pages/dashboard/ExpensesChart';
import IncomeChart from '~/pages/dashboard/IncomeChart';
import PieChartLight from '~/pages/dashboard/PieChartLight';
import PopularChart from '~/pages/dashboard/PopularChart';
import SeasonChart from '~/pages/dashboard/SeasonChart';
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
