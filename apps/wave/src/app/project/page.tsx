import ExpensesChart from '~root/components/MockDashboard/ExpensesChart';
import IncomeChart from '~root/components/MockDashboard/IncomeChart';
import PieChartLight from '~root/components/MockDashboard/PieChartLight';
import PopularChart from '~root/components/MockDashboard/PopularChart';
import SeasonChart from '~root/components/MockDashboard/SeasonChart';
import InfoBlockCarousel from '~root/components/infoblock';

export default async function Project() {
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
