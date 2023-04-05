// ==UserScript==
// @name         吾爱论坛一键评论
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.52pojie.cn/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=52pojie.cn
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 创建按钮
    let button = document.createElement('button');
    button.type='submit';
    button.name = 'replysubmit';
    button.id="fastpostsubmit";
    button.className='pn pnc vm';
    button.value='replysubmit';
    // 找到添加到的父节点
    let p1 = document.getElementsByClassName('ptm pnpost')[0]
    p1.insertBefore(button, p1.childNodes[4])
    // 创建strong元素，并添加到按钮中
    let strong = document.createElement('strong');
    strong.textContent='一键评论'
    button.appendChild(strong)
    //添加监听事件
    button.addEventListener('click', userClick);
    // Your code here...
})();

function userClick() {
    // 获取验证答案
    let answer = document.getElementsByClassName('p_pop p_opt');
    answer = answer[0].textContent;
    let a1 = answer.match(/答案：(.*)/);
    console.log(a1[0]);
    // 获取输入框，并输入答案
    let input1 = document.getElementsByClassName('txt px vm');
    input1[0].value = a1[1];
    // 输入评论
    let list = ['感谢分享，谢谢楼主', '谢谢分享!!!!!收藏一下！', '谢谢分享！']
    let randomIndex = Math.floor(Math.random() * list.length);
    let area = document.getElementById('fastpostmessage')
    area.value= list[randomIndex]

}
