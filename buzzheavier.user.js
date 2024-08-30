// ==UserScript==
// @name         Scam ads remover
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove scam ads from buzzheavier
// @author       Valentineuh
// @match        *://*.buzzheavier.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function check(url) {
        if (url.includes('/t?v=')) {
            return 'torrent';
        } else {
            return 'download';
        }
    }

    function swap() {
        const base = 'https://dl.buzzheavier.com/';
        const elements = document.querySelectorAll('script');
        const links = {
            download: null,
            torrent: null
        };

        elements.forEach(element => {
            const text = element.textContent || '';
            const pattern = /https:\/\/dl\.buzzheavier\.com\/[^\s"]+/g;

            let match;
            while ((match = pattern.exec(text)) !== null) {
                if (match[0].startsWith(base)) {
                    const type = check(match[0]);
                    links[type] = match[0];
                }
            }
        });

        document.querySelectorAll('ul li').forEach(item => {
            const span = item.querySelector('span');
            if (span) {
                const button = span.querySelector('button');
                if (button) {
                    let html = '';
                    if (span.textContent.includes('Download') && links.download) {
                        html = `<a href="${links.download}" class="link-button" target="_blank">Download</a> <span style="color: red; font-size: small;">  (Removed Scam Ads)</span>`;
                    }
                    if (span.textContent.includes('Torrent') && links.torrent) {
                        html = `<a href="${links.torrent}" class="link-button" target="_blank">Download</a> <span style="color: red; font-size: small;">  (Removed Scam Ads)</span>`;
                    }
                    if (html) {
                        button.outerHTML = html;
                    }
                }
            }
        });
    }

    setInterval(swap, 10);
})();
