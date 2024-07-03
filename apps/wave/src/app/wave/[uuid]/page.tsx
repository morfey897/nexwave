import ExpensesChart from '~/components/MockDashboard/ExpensesChart';
import IncomeChart from '~/components/MockDashboard/IncomeChart';
import PieChartLight from '~/components/MockDashboard/PieChartLight';
import PopularChart from '~/components/MockDashboard/PopularChart';
import SeasonChart from '~/components/MockDashboard/SeasonChart';
import InfoBlockCarousel from '~/components/infoblock';
import Template from './tpl';

export default async function Project() {
	return (
		<Template>
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
		</Template>
	);
}
