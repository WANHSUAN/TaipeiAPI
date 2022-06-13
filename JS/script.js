// 透過 API 取得所有資料

// 宣告預備存取資料的變數 alldata
var alldata;

// 宣告變數 xhr ，儲存一個 XMLHttpRequest 物件以抓取別人的資料，該物件裡面有很多方法跟特性可以做應用，例如 onload/readyState
var xhr = new XMLHttpRequest();

// 從網址讀取資料
xhr.open('get', 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?%24top=40&%24format=JSON', true);

// 讀取資料
xhr.send(null);

// 當資料都跑完之後才會觸發此事件
xhr.onload = function() {
    // 用 if 判斷式把 HTTP 連線狀態加入判斷
    if(xhr.status == 200) {
        // 把抓到的資料物件化或陣列化，加以運用
        var jsonObj = JSON.parse(xhr.responseText);
        // 選取變數，賦值到變數中
        alldata = jsonObj;
        // 匯入函式
        updataMenu();
    };
}


//  宣告內容不重複的變數 noRepeatDis
var noRepeatDis;

function updataMenu() {
    // 宣告一個空陣列 allDataDis 來放觀光類型
    var allDataDis = [];
    // 把所有的 alldata.class1 觀光類型 拿出來加進 allDataDis 物件中
    for(var i = 0; i < alldata.length; i++) {
        allDataDis.push(alldata[i].Class2);
    }
    // console.log(allDataDis);

    // 組成新陣列，且去除重複項目
    // Array.from(new Set()) -> 從集合產生陣列
    noRepeatDis = Array.from(new Set(allDataDis));
    // console.log(noRepeatDis);

    // 宣告空字串 str
    var str = '';
    str = `<option value="請選擇觀光類型" selected >請選擇觀光類型</option>`;
    
    // 把所有的觀光類型放入 str 字串中
    for(var i = 1; i < noRepeatDis.length; i++) {
        str += `<option value="${noRepeatDis[i]}">${noRepeatDis[i]}</option>`;
    }

    // 選取 DOM，並渲染到網頁
    document.querySelector('.select_form').innerHTML = str;
}


// 標題變動
// 選出 select_form 下拉式選單區塊和 title

var option = document.querySelector('.select_form');
var title = document.querySelector('.littleTitle');

// 監聽事件，當 option change 時，執行 updataTitle 函式
option.addEventListener('change', updataTitle);

function updataTitle(e) {

    // 點選的目標物的值           (或)
    var select = e.target.value || e.target.textContent;

    // 宣告 空字串 titleStr
    var titleStr = '';

    // 迴圈 i 小於 noRepeatDis 陣列的項目數量
    for(var i = 0; i < noRepeatDis.length; i++) {
        // 如果點選該物件的值 = 陣列的索引值的該項目，要去做配對，不然會一直寫到最後一個
        if(select == noRepeatDis[i]) {
            titleStr = noRepeatDis[i];
            title.innerHTML = titleStr;
        }else if(select == '請選擇觀光類型'){
            title.textContent = '請選擇觀光類型';
        }
    }

    // 分頁欄 寫在標題變動的地方
    // 宣告空陣列 selectArray
    var selectArray = [];

    for(var i = 0; i < alldata.length; i++) {
        // i < alldata.length 是為了要算出該區域有多少個景點
        if(select == alldata[i].Class2) {
            selectArray.push(alldata[i]);
            // 空陣列放進 alldata 的該項物件（與 select 的區域對到的該區域景點）
        }
    }

    // 選取按鈕區塊
    // 宣告變數 page
    var page = document.querySelector('.btncontent');
    
    // 全域物件的 Math.ceil() 向上取整數，例如 5.5 會變成 6
    // 然後將取出來的該區景點數量除以 6 （一頁放 6 個景點）
    var btnNum = Math.ceil(selectArray.length / 6);

    // 宣告空字串 pageStr
    var pageStr = '';

    // 將 頁數 依序渲染到網頁
    for(var i = 0; i < btnNum; i++) {
        pageStr += `<span class="btn btn-danger border-info m-2 fs-6">${i + 1}</span>`;
        page.innerHTML = pageStr;
    }
    // console.log(pageStr);
}



// 內容區塊
// 建立事件 觸發 content 改變

// 宣告變數 content
var content = document.querySelector('.content');

// 當 option change 時，執行 updataContent 函式
option.addEventListener('change', updataContent);

function updataContent(e) {

    // 點選下拉式選單的值
    var select = e.target.value || e.target.textContent;
    
    // 宣告空字串 contentStr
    var contentStr = '';

    // i < alldata.length 的原因是這段是要顯示資料裡面所有的景點資料，
    // 所以不需要刪除掉重複的，不然一個區域只有一個景點了
    for(var i = 0; i < alldata.length; i++) {

        // 如果選單的值和 alldata 的 Class2 對得上
        if(select == alldata[i].Class2) {

            // 要渲染到網頁的內容
            contentStr += `
            <div class="col-10 col-md-5 box h-80 position-relative my-5 p-5 rounded-3 shadow-lg bg-secondary">
                <img class="itempic w-100 h-33 rounded-3" src="${alldata[i].Picture.PictureUrl1}" alt="">
                <h3 class="item_title py-4 fs-4 text-primary">${alldata[i].ScenicSpotName}</h3>
                <ul>
                    <li class="list-unstyled">
                        <div class="class1 d-flex py-2">
                            <img src="img/pamphlet.png" class="w-7 h-7">
                            <p class="class2 ps-2">${alldata[i].Class2}</p>
                        </div>
                    </li>
                    <li class="list-unstyled">
                        <div class="phone1 d-flex py-2">
                            <img src="img/smartphone-call.png" class="w-7 h-7">
                            <p class="phone2 ps-2">${alldata[i].Phone}</p>
                        </div>
                    </li>
                    <li class="list-unstyled">
                        <div class="opentime1 d-flex py-2">
                            <img src="img/clock.png" class="w-7 h-7">
                            <p class="opentime2 ps-2">${alldata[i].OpenTime}</p>
                        </div>
                    </li>
                </ul>
                <a class="addressBtn position-absolute bottom-5 end-5 m-2 p-2 border border-warning rounded-3 text-decoration-none text-primary btn-danger btn-danger-hover" href="${alldata[i].WebsiteUrl}">進入網站</a>
            </div>`
        }
    }
    
    // 選取 content ，渲染到網頁
    content.innerHTML = contentStr;
}