import type { IMessage } from '@rocket.chat/core-typings';
import { Box, Icon } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
import type { ReactElement } from 'react';
import React from 'react';

type ReadReceiptIndicatorProps = {
	mid: IMessage['_id'];
	unread?: boolean;
};

const ReadReceiptIndicator = ({ mid, unread }: ReadReceiptIndicatorProps): ReactElement | null => {
	const t = useTranslation();

	return (
		<Box
			role='status'
			id={`${mid}-read-status`}
			aria-label={unread ? t('Message_sent') : t('Message_viewed')}
			position='absolute'
			insetBlockStart={2}
			insetInlineEnd={8}
		>
			<Icon size='x16' name={unread ? 'check' : 'double-check'} color={unread ? 'annotation' : 'info'} />
		</Box>
	);
};

export default ReadReceiptIndicator;
