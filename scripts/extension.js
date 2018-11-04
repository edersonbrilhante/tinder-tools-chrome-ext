'use strict';


var button = document.getElementById('scrollUser')
button.addEventListener('click', function () {
let code = `
    scrollUsers()

    var stop = false
    var totalBefore = 0
    var totalAfter = 0

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function scrollUsers() {
        totalBefore = document.querySelectorAll('.messageListItem').length
        var input = document.querySelector('.desktopMessageList');
        input.scrollTop= input.scrollHeight
        await sleep(5000)
        input.scrollTop = 0
        await sleep(5000)
        input.scrollTop= input.scrollHeight
        await sleep(5000)
        totalAfter = document.querySelectorAll('.messageListItem').length
        if (totalBefore != totalAfter) {
            await scrollUsers()
        }
    }
    `
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
        tabs[0].id,
        { code: code });
    });
})


var button = document.getElementById('sendMsgAll')
button.addEventListener('click', function () {
    let msg = document.getElementById('msgText').value;
    let code = `
    async function sendMsg(msg){
        console.log(msg)
        var input = document.querySelector('textarea');
        var lastValue = input.value;
        
        input.value = msg;
        var event = new Event('input', { bubbles: true });
        event.simulated = true;
        var tracker = input._valueTracker;
        if (tracker) {
            tracker.setValue(lastValue);
        }
        input.dispatchEvent(event);
        document.querySelectorAll('button')[1].click()
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function iterUsers(msg){
        userList = document.querySelectorAll('.messageListItem__nameAndBadges')
        sizeMsg = userList.length
        for(i=1; i<=sizeMsg; i++){
            item = userList[i-1]
            item.click()
            await sleep(1000)
            await sendMsg(msg)
            await sleep(1000)

        }
    }
    iterUsers('${msg}')
    `
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
        tabs[0].id,
        { code: code });
    });
});
  

var button = document.getElementById('sendMsgNew')
button.addEventListener('click', function () {
    let msg = document.getElementById('msgText').value;
    let code = `
    async function sendMsg(msg){
        console.log(msg)
        var input = document.querySelector('textarea');
        var lastValue = input.value;
        
        input.value = msg;
        var event = new Event('input', { bubbles: true });
        event.simulated = true;
        var tracker = input._valueTracker;
        if (tracker) {
            tracker.setValue(lastValue);
        }
        input.dispatchEvent(event);
        document.querySelectorAll('button')[1].click()
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function iterUsers(msg){
        userList = document.querySelectorAll('.matchListItem')
        sizeMsg = userList.length
        for(i=1; i<=sizeMsg; i++){
            item = userList[i-1]
            item.click()
            await sleep(1000)
            await sendMsg(msg)
            await sleep(1000)

        }
    }
    iterUsers('${msg}')
    `
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
        tabs[0].id,
        { code: code });
    });
});
  

var button = document.getElementById('likeAll')
button.addEventListener('click', function () {
    let code = `
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async function openProfile(){  
        if( document.querySelectorAll('.recCard__openProfile').length>0){            
            document.querySelectorAll('.recCard__openProfile')[0].click()
            await sleep(500)
            await viewPic()
            await sleep(500)
        }
        else{
            await like()
            await sleep(500)
        }
        await sleep(500)
        await openProfile()
    }

    async function clickPic(){
        document.querySelectorAll('.profileCard__slider__backLink button')[1].click()
    }


    async function viewPic(){
        if(document.querySelectorAll('.profileCard__slider__backLink .CenterAlign').length > 0){
            size = document.querySelectorAll('.profileCard__slider__backLink .CenterAlign')[0].querySelectorAll('div').length
            for(j=1;j<size;j++){
                await sleep(500)
                await clickPic()
                await sleep(500)
            }

        }
        await like()
        await sleep(500)
    }

    async function like(){
        document.querySelectorAll('.recsGamepad__button--like')[0].click()
    }

    openProfile()
`
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log(tabs[0].id)
      chrome.tabs.executeScript(
        tabs[0].id,
        { code: code });
    });
  })
  

