// ==UserScript==
// @name         XHR拦截器 - 青少年请求拦截
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  拦截特定XHR请求并获取数据
// @author       zhilv
// @match        https://app.youth.cq.cqyl.org.cn/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 保存原始的XMLHttpRequest原型对象
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;
    let rightKey;

    // 创建悬浮消息元素
    function createFloatingMessage(text) {
        const message = document.createElement('div');
        message.textContent = text;
        message.style.position = 'fixed';
        message.style.bottom = '20px';
        message.style.right = '20px';
        message.style.padding = '10px 20px';
        message.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        message.style.color = '#fff';
        message.style.borderRadius = '5px';
        message.style.zIndex = '10000';
        message.style.fontSize = '16px';
        message.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        document.body.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 1000); // 悬浮消息显示3秒后自动消失
    }

    // 重写open方法
    XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
        this._url = url; // 将请求的URL保存到XMLHttpRequest对象中
        return originalXHROpen.apply(this, arguments);
    };

    // 重写send方法
    XMLHttpRequest.prototype.send = function (body) {
        this.addEventListener('load', function () {
            // 检查URL是否为目标URL
            if (this._url === '/api/service-youthcadres/ycqYlcTopicBank/auth/queryForApp') {
                // console.log('拦截到的XHR请求:', this._url);
                // console.log('请求的参数:', body); // 打印请求参数
                // console.log('响应数据:', this.responseText); // 打印响应数据

                const response = JSON.parse(this.responseText);
                if (response && response.data && response.data.rightKey) {
                    rightKey = response.data.rightKey;
                    console.log('正确答案:', rightKey);

                    // 休眠2秒，然后执行点击操作
                    setTimeout(() => {
                        const rightKeyArray = rightKey.split('');
                        const spans = document.getElementsByClassName('rv-button__text');
                        let clickArr = [];

                        /* for (let i = 0; i < spans.length; i++) {
                            try {
                                const spanContent1 = spans[i].textContent.trim();
                                // console.log("rightKeyArray", rightKeyArray, "spanContent", spanContent, rightKeyArray.includes(spanContent));
                                if (spanContent1 === "继续闯关") {
                                    const isHidden = spans[i].offsetParent === null;
                                    console.log('继续闯关按钮:', spans[i], '是否隐藏:', isHidden);
                                    if (!isHidden) {
										console.log("aaa")
                                        spans[i].click()
                                    }
                                }
                            } catch {
                                continue
                            }
                        } */

                        for (let i = 0; i < spans.length; i++) {
                            const spanContent = spans[i].querySelector('span').textContent.trim();
                            // console.log("rightKeyArray", rightKeyArray, "spanContent", spanContent, rightKeyArray.includes(spanContent));

                            if (rightKeyArray.includes(spanContent)) {
                                clickArr.push(i);
                            }
                        }

                        // 遍历clickArr并逐个点击按钮，添加延迟
                        clickArr.forEach((index, idx) => {
                            setTimeout(() => {
                                console.log(`点击按钮索引: ${index}`);
                                spans[index].parentElement.click();

                                // 如果是最后一个按钮，显示提示
                                if (idx === clickArr.length - 1) {
                                    setTimeout(() => {
                                        createFloatingMessage('所有正确答案已选择完毕！');
                                        setTimeout(() => {
                                            spans[spans.length - 1].click();
                                        }, 1000); // 延时2秒点击提交按钮
                                    }, 500); // 最后一个点击完成后再延迟500ms显示提示
                                }
                            }, idx * 500); // 每次点击之间的延迟为500ms
                        });

                    },
                        1000); // 休眠2秒
                }
            }
        });

        return originalXHRSend.apply(this, arguments);
    };
})();
