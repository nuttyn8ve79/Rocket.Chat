import React from 'react';
import { Box, Icon } from '@rocket.chat/fuselage';

import PlanTag from '../../components/basic/PlanTag';
import Card from '../../components/basic/Card/Card';
import { useTranslation } from '../../contexts/TranslationContext';
import { useHasLicense } from '../../../ee/client/hooks/useHasLicense';
import UsagePieGraph from './UsagePieGraph';

const Feature = ({ label, enabled }) => {
	return <Box display='flex' flexDirection='row' mb='x4'>
		<Box color={enabled ? 'success' : 'danger'}><Icon name={enabled ? 'check' : 'cross'} size='x16' /></Box>
		{label}
	</Box>;
};

const LicenseCard = () => {
	const t = useTranslation();

	const hasEngagement = useHasLicense('engagement-dashboard');
	const hasOmnichannel = useHasLicense('livechat-enterprise');
	const hasAuditing = useHasLicense('auditing');
	const hasCannedResponses = useHasLicense('canned-responses');

	return <Card>
		<Card.Title>{t('License')}</Card.Title>
		<Card.Body>
			<Card.Col>
				<Card.Col.Section>
					<PlanTag />
				</Card.Col.Section>
				<Card.Col.Section>
					<Card.Col.Title>{t('Features')}</Card.Col.Title>
					<Feature label={t('Omnichannel')} enabled={hasOmnichannel}/>
					<Feature label={t('Auditing')} enabled={hasAuditing}/>
					<Feature label={t('Canned_responses')} enabled={hasCannedResponses}/>
					<Feature label={t('Engagement_Dashboard')} enabled={hasEngagement}/>
				</Card.Col.Section>
				<Card.Col.Section>
					<Card.Col.Title>{t('Usage')}</Card.Col.Title>
					<Box display='flex' flexDirection='row'>
						<UsagePieGraph label={t('Users')} used={300} total={300} />
						<UsagePieGraph label={t('Integrations')} used={200} total={300} />
					</Box>
				</Card.Col.Section>
			</Card.Col>
		</Card.Body>
	</Card>;
};

export default LicenseCard;
