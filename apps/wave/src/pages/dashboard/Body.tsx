import ExpensesChart from './charts/ExpensesChart';
import IncomeChart from './charts/IncomeChart';
import PieChartLight from './charts/PieChartLight';
import PopularChart from './charts/PopularChart';
import SeasonChart from './charts/SeasonChart';
import InfoBlockCarousel from './components/InfoBlocks';

function Body() {
	return (
		<main>
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
		</main>
	);
}

export default Body;
