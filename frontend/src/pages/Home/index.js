import CardAds from '~/components/CardAds/CardAds';
import BestRecruitment from './BestRecruitment/BestRecruitment';
import FindJobs from './FindJobs/FindJobs';
import RuleBottom from './RuleBottom/RuleBottom';
import Signin from './Signin/Signin';

export default function Home() {
    return (
        <>
            <FindJobs />
            <CardAds />
            <BestRecruitment />
            {/* <RelatedJob /> */}
            <RuleBottom />
            <Signin />
        </>
    );
}
