import CountDown from '@components/Countdown';
import WidgetLayout from '@components/Layouts/WidgetLayout';

function REQUESR_EXPIRED() {
	return <CountDown />;
}

export default REQUESR_EXPIRED;
REQUESR_EXPIRED.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
