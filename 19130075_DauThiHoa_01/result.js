// Hằng số và biến trò chơi
const score = document.querySelector('.frames-score');
const star1 = document.querySelector('.fa-star1');
const star2 = document.querySelector('.fa-star2');
const star3 = document.querySelector('.fa-star3');
const levelBox  =  document.getElementById('levelBox');
const scoreBox = document.getElementById('scoreBox');

// Lấy tổng số điểm cao nhất đạt được của người chơi qua các level
let hiscore = localStorage.getItem("hiscore");
// Nếu người chơi chưa chơi high = 0
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
// Lấy điểm số cao nhất
else{
    hiscoreval = JSON.parse(hiscore);
    // score.innerHTML = "High: " + hiscore;
    score.innerHTML = hiscore;
}

// Lấy số level trước khi thua
let level = localStorage.getItem("levelBox");
if(level === null){
    levelval = 0;
    localStorage.setItem("levelBox", JSON.stringify(levelval))
}
else{
    levelval = JSON.parse(level);
    levelBox.innerHTML = "Screen : " + levelval
}
// Lấy số điểm đã chơi được trong level trước đó
let score_Box = localStorage.getItem("score_Box");
if(score_Box === null){
    scoreVal = 0;
    scoreBox.innerHTML = "Score : " + scoreVal ;
}
else{
    scoreVal = JSON.parse(score_Box);
    scoreBox.innerHTML = "Score : " + scoreVal ;
}

let scoreValue = parseInt(score.innerHTML);

// Hiển thị số sao đạt được của người chơi qua tất cả các level
// Nếu điểm cao nhất mà người chơi đạt được dưới 50 điểm
// -> không hiển thị sao nào ( 3 hình sao đều có màu đen )
if (scoreValue < 50 ){
    star1.style.color = "black";
    star2.style.color = "black";
    star3.style.color = "black";

}
// Nếu điểm cao nhất mà người chơi đạt được lớn hơn hoặc bằng 50 điểm
// -> Hiển thị 1 sao ( tô màu cho hình sao đầu tiên có màu vàng )
if ( scoreValue >= 50 ){
    star1.style.color = "yellow";

}
// Nếu điểm cao nhất mà người chơi đạt được lớn hơn hoặc bằng 100 điểm
// -> Hiển thị 2 sao ( tô màu cho 2 hình sao đầu tiên có màu vàng )
if ( scoreValue >= 100 ) {
    star1.style.color = "yellow";
    star2.style.color = "yellow";

}
// Nếu điểm cao nhất mà người chơi đạt được lớn hơn hoặc bằng 150 điểm
// -> Tô màu cho cả 3 hình sao đều có màu vàng )
if ( scoreValue >= 150 ) {
    star1.style.color = "yellow";
    star2.style.color = "yellow";
    star3.style.color = "yellow";
}

hiscoreval = 0;
localStorage.setItem("hiscore", JSON.stringify(hiscoreval))

