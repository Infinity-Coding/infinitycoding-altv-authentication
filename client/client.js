import alt from 'alt-client';
import native from 'natives';

import './clientAuth';

//@notification
alt.onServer("client:notification:show", notifyShow);

export function notifyShow (
    message,
    flashing = false,
    textColor = -1,
    bgColor = -1,
    flashColor = [0, 0, 0, 50]
) {
    native.beginTextCommandThefeedPost('STRING');
    if (textColor > -1) native.setColourOfNextTextComponent(textColor);
	if (bgColor > -1) native.thefeedSetNextPostBackgroundColor(bgColor);
	if (flashing) {
		native.thefeedSetAnimpostfxColor(
			flashColor[0],
			flashColor[1],
			flashColor[2],
			flashColor[3]
		);
	}
    native.addTextComponentSubstringPlayerName(message);
    native.endTextCommandThefeedPostTicker(flashing, true);
}