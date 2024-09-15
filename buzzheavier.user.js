// ==UserScript==
// @name         Buzzheavier Tools
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Enhances user experience on Buzzheavier.
// @author       Valentineuh
// @match        *://*.buzzheavier.com/f/*
// @match        *://*.buzzheavier.com/*
// @grant        none
// ==/UserScript==

! function() {
    function addCopyButton() {
        document.querySelectorAll('ul li a[target="_blank"]').forEach((e => {
            const t = e.parentNode;
            if (!t.querySelector(".copy")) {
                const o = document.createElement("button");
                o.className = "copy", o.innerText = "Copy URL", o.addEventListener("click", (() => {
                    const t = e.href;
                    navigator.clipboard.writeText(t).then((() => {
                        alert("Link copied to clipboard!")
                    }))["catch"]((e => {
                        console.error("Failed to copy text: ", e)
                    }))
                })), t.appendChild(o)
            }
        }))
    }
    if (window.location.href.includes("buzzheavier.com/f/")) setInterval((function swap() {
        const e = document.querySelectorAll("script"),
            t = {
                download: null,
                torrent: null
            };
        e.forEach((e => {
            const o = e.textContent || "",
                n = /https:\/\/dl\.buzzheavier\.com\/[^\s"]+/g;
            let l;
            for (; null !== (l = n.exec(o));)
                if (l[0].startsWith("https://dl.buzzheavier.com/")) {
                    const e = l[0].includes("/t?v=") ? "torrent" : "download";
                    t[e] = l[0]
                }
        })), document.querySelectorAll("ul li").forEach((e => {
            const o = e.querySelector("span");
            if (o) {
                const e = o.querySelector("button");
                if (e) {
                    let n = "";
                    o.textContent.includes("Download") && t.download && (n = `<a href="${t.download}" class="link-button" target="_blank">Download</a> <span style="color: red; font-size: small;">  (Removed Scam Ads)</span>`), o.textContent.includes("Torrent") && t.torrent && (n = `<a href="${t.torrent}" class="link-button" target="_blank">Download</a> <span style="color: red; font-size: small;">  (Removed Scam Ads)</span>`), n && (e.outerHTML = n)
                }
            }
        }))
    }), 10);
    else if (window.location.href.includes("buzzheavier.com")) {
        const e = new MutationObserver((() => {
                addCopyButton()
            })),
            t = document.querySelector('div[x-data="uploadManager()"] ul'),
            o = {
                childList: !0,
                subtree: !0
            };
        t && e.observe(t, o)
    } else window.location.href.includes("buzzheavier.com/fl") && function handleFlPage() {
        addCopyButton();
        const e = new MutationObserver((() => {
                addCopyButton()
            })),
            t = document.querySelector('div[x-data="uploadManager()"] ul'),
            o = {
                childList: !0,
                subtree: !0
            };
        t && e.observe(t, o)
    }()
}();
