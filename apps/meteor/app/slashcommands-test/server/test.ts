import { api } from '@rocket.chat/core-services';
import type { SlashCommandCallbackParams } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';

import { i18n } from '../../../server/lib/i18n';
import { settings } from '../../settings/server';
import { setUserStatusMethod } from '../../user-status/server/methods/setUserStatus';
import { slashCommands } from '../../utils/lib/slashCommand';

slashCommands.add({
	command: 'test',
	callback: async function Status({ params, message, userId }: SlashCommandCallbackParams<'test'>): Promise<void> {
		if (!userId) {
			return;
		}

		const user = await Users.findOneById(userId, { projection: { language: 1 } });
		const lng = user?.language || settings.get('Language') || 'en';

		try {
			await setUserStatusMethod(userId, undefined, params);

			void api.broadcast('notify.ephemeralMessage', userId, message.rid, {
				msg: i18n.t('StatusMessage_Changed_Successfully', { lng }),
			});
		} catch (err: any) {
			if (err.error === 'error-not-allowed') {
				void api.broadcast('notify.ephemeralMessage', userId, message.rid, {
					msg: i18n.t('StatusMessage_Change_Disabled', { lng }),
				});
			}

			throw err;
		}
	},
	options: {
		description: 'Slash_Status_Description',
		params: 'Slash_Status_Params',
	},
});
