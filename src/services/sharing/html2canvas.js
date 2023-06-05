/**
 * https://html2canvas.hertzen.com/
 *
 * @displayName html2canvas
 */

import html2canvas from 'html2canvas';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';
import baseLocalHelper from '@/helpers/baseLocalHelper';

// iife here!
function share(element, title, fn) {
    (async () => {
        if (!('share' in navigator)) {
            fn();
            return;
        }
        // `element` is the HTML element you want to share.
        // `backgroundColor` is the desired background color.
        const canvas = await html2canvas(element, { scale: '2' });
        canvas.toBlob(async (blob) => {
            // Even if you want to share just one file you need to
            // send them as an array of files.
            const files = [
                new File([blob], `${title}.png`, { type: blob.type }),
            ];
            const shareData = {
                title: '',
                files,
            };
            if (navigator.canShare(shareData)) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        baseNotificationsHelper.Message(
                            true,
                            baseLocalHelper.$_pleaseDownload
                        );
                        alert(baseLocalHelper.$_pleaseDownload);
                        console.error(err.name, err.message);
                    }
                }
            } else {
                console.warn('Sharing not supported', shareData);
                fn();
            }
        });
    })();
}

const exportAsImage = async (element, FileName) => {
    try {
        const canvas = await html2canvas(element, { scale: '2' });
        const image = canvas.toDataURL('image/png', 1.0);
        downloadImage(image, FileName);
    } catch (err) {
        baseNotificationsHelper.Message(
            true,
            baseLocalHelper.$_MsgErrorAndRetry
        );
        console.error(err.name, err.message);
    }
};

const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement('a');
    fakeLink.style = 'display:none;';
    fakeLink.download = fileName;

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();

    baseNotificationsHelper.Message(false, baseLocalHelper.$_MsgGenericSuccess);
};

export default {
    $_share(element, title, fn) {
        share(element, title, fn);
    },

    $_download(element, FileName) {
        exportAsImage(element, FileName);
    },
};
