// ==UserScript==
// @name         学生评价
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  重庆城市管理职业学院学生评价
// @author       zhilv
// @match        http://jiaowu.cswu.cn/jsxsd/framework/xsMain.jsp
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 等待页面加载完成
    window.addEventListener('load', function () {
        // 创建新按钮
        var newButton = document.createElement('input');
        newButton.type = 'button';
        newButton.value = '运行脚本';
        newButton.style.marginLeft = '10px'; // 添加一些间距使其看起来更美观

        // 按钮点击事件处理程序
        newButton.onclick = function () {
            // 选择iframe
            var iframe = document.getElementsByTagName('iframe')[1]; // 替换为你的iframe的ID或使用其他选择器
            if (iframe) {
                // 确保iframe内容已加载
                // iframe.addEventListener('load', function () {
                    // 访问iframe的内容
                    var iframeDocument = iframe.contentDocument;
                    // 获取iframe中的元素
                    var zbtd = iframeDocument.getElementsByName('zbtd');
                    for (let i = 0; i < zbtd.length; i++) { // 修正循环条件
                        if (i === zbtd.length - 2) {
                            zbtd[i].querySelectorAll('input')[2].click();
                        } else {
                            zbtd[i].querySelector('input').click();
                        }
                    }
                    var jynr = iframeDocument.getElementsByName('jynr')[0]; // 修正访问iframe中的元素
                    if (jynr) {
                        jynr.textContent = "无";
                    }
                // });
                // 重新加载iframe，以确保load事件触发
                // iframe.src = iframe.src;
            } else {
                console.log('iframe not found');
            }
        };

        // 找到指定的 <li> 元素并在其旁边插入新按钮
        var targetLi = document.querySelector('li[onclick="xxtz()"]');
        if (targetLi) {
            var parentUl = targetLi.parentNode;
            var newLi = document.createElement('li');
            newLi.appendChild(newButton);
            parentUl.insertBefore(newLi, targetLi.nextSibling);
        } else {
            console.log('Target li not found');
        }
    });
})();
