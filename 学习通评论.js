// ==UserScript==
// @name         学习通讨论一键回复
// @namespace    http://tampermonkey.net/
// @version      2024-05-08
// @description  try to take over the world!
// @author       You
// @match        https://groupweb.chaoxing.com/course/topic/v3/bbs/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chaoxing.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


window.onload = function() {
	if (document.getElementsByClassName('btnBlue btn_92 fr fs14 replyBtn')[0].textContent === '回复') {
		var aa = document.getElementsByClassName('btnBlue btn_92 fr fs14 replyBtn')[0];
		var bb = aa.cloneNode(true);
		bb.textContent = '一键回复';
		aa.parentNode.appendChild(bb);

		bb.addEventListener('click', function() {
			var contents = document.getElementsByClassName('replyContent');
			if (contents.length > 0) {
				var text = contents[1].textContent; // 访问第一个 replyContent 元素的内容
				var textarea = document.querySelector('.textareawrap textarea');
				textarea.value = text;

				var addReplyBtn = document.querySelector('.jb_btn.jb_btn_92.fr.fs14.addReply');
				if (addReplyBtn && addReplyBtn.textContent === '回复') {
					addReplyBtn.click();
				}
			}
			location.reload()
		});
	}
}

    // Your code here...
})();
