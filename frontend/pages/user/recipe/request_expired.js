import CountDown from '@components/Countdown';
import WidgetLayout from '@components/Layouts/WidgetLayout';

function ExpiredTime() {
	return <CountDown />;
}

export default ExpiredTime;
ExpiredTime.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
