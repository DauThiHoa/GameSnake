// Hằng số và biến trò chơi
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('eat.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('bg-music.mp3');

// const board = document.getElementById('board');
// Số dòng và số cột trong khung chơi của con rắn
let rowBoard = 18 ;
let columnBoard = 18 ;

let speed = 5; // Tốc độ rắn
let score = 0; // Tổng số thức ăn
let randomFood = score ;// Hiển thị nhiều hình ảnh khác nhau của thức ăn
let lastPaintTime = 0;// Thời givan cuối cùng

// Xuất hiện vị trí random của snake oishi
let snakeArr = [
    // Rắn
    {x: Math.ceil(Math.random()*10), y: Math.ceil(Math.random()*10)}
];
// Xuất hiện vị trí random của thức ăn
let food = {x: Math.ceil(Math.random()*10), y: Math.ceil(Math.random()*10)};

// [ 5-6 ; 11-10 ; 7-16 ; 16-3 ; 16-14] mảng Tree
let impediment = {x: 5, y: 6};
let impediment_1 = {x: 11, y: 10};
let impediment_2 = {x: 7, y: 16};
let impediment_3 = {x: 16, y: 3};
let impediment_4 = {x: 16, y: 14};

// Chướng ngại vật
let tree = [
    {x: 11, y: 2},{x: 12, y: 2},{x: 12, y: 3},
    {x: 4, y: 12},{x: 4, y: 10},{x: 5, y: 10}
];
// Chức năng trò chơi
function main(ctime) {
    // Yêu cầu khung hình
    window.requestAnimationFrame(main);
    musicSound.play();
    // console.log(ctime)
    // Ctime là thời gian hiện tại
    if((ctime - lastPaintTime)/1000 < 1/speed){ // Tốc độ của con rắn
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

/* Kiểm tra xem con rắn có chạm phải giới hạn hay thân rắn của nó hay không
   -> True : có va chạm
   -> False : không có va chạm
 */
function isCollide(snake) {
    // Nếu rắn chạm vào chính mình
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // Nếu rắn chạm vào vạch giới hạn trong khung chơi ( tường )
    if (snake[0].x >= 19 || snake[0].x <= 0 || snake[0].y >= 19 || snake[0].y <= 0){ // Chạm vạch tường
        return true;
    }

    if(snake[0].x === 5 && snake[0].y === 6 ){ // Chạm chướng ngại vật
        return true;
    }
    if(snake[0].x === 11 && snake[0].y === 10 ){ // Chạm chướng ngại vật
        return true;
    }
    if(snake[0].x === 7 && snake[0].y === 16 ){ // Chạm chướng ngại vật
        return true;
    }
    if(snake[0].x === 16 && snake[0].y === 3 ){ // Chạm chướng ngại vật
        return true;
    }
    if(snake[0].x === 16 && snake[0].y === 14 ){ // Chạm chướng ngại vật
        return true;
    }

    for (let i = 0; i < tree.length; i++) {
        if(tree[i].x === snake[0].x && tree[i].y === snake[0].y){
            return true;
            break;
        }
    }
    return false;
}
// Cập nhật lại số điểm và hiển thị lại vị trí của rắn và thức ăn

function gameEngine(){

    // Nếu rắn đã ăn thức ăn, hãy tăng số điểm và tái tạo thức ăn
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x ){
        foodSound.play();
        score += 1;
        randomFood = score ;
        // biến localstorage : để lưu trữ điểm cao từ bộ nhớ cục bộ
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        // Điều kiện qua màn score = 50
        // if (hiscoreval === '50'){
        //     fas.href = "SNAKE_3.html";
        //     window.location = "SNAKE_3.html";
        // }
        // Bất cứ khi nào rắn ăn thức ăn, sẽ thêm một đầu vào nó bằng cách sử dụng hàm unshift ()
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        // Sau khi con rắn ăn thức ăn, sẽ tái tạo thức ăn bằng cách tạo ra các giá trị ngẫu nhiên giữa a và b
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + ( b-a )* Math.random()), y: Math.round(a + ( b-a )* Math.random())}
    }
    // [ 5-6 ; 11-10 ; 7-16 ; 16-3 ; 16-14]
    // Nếu thức ăn hiện ngay vị trí chướng ngại vật -> cập nhật lại vị trí thức ăn
    for (let i = 1; i < snakeArr.length; i++) {
        for (let i = 1; i < tree.length; i++) {
            // if (snakeArr[i].x === food.x && snakeArr[i].y === food.y
            if (tree[i].x === food.x && tree[i].y === food.y
                || 5 === food.x && 6 === food.y
                || 11 === food.x && 10 === food.y
                || 7 === food.x && 16 === food.y
                || 16 === food.x && 3 === food.y
                || 16 === food.x && 14 === food.y) {

                food.x === food.y ;
                food.y === food.x ;
                if (snakeArr[0].y === food.x && snakeArr[0].x === food.y) {
                    foodSound.play();
                    score += 1;
                    randomFood = score;
                    if (score > hiscoreval) {
                        hiscoreval = score;
                        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                        hiscoreBox.innerHTML = "High: " + hiscoreval;
                    }
                    scoreBox.innerHTML = "Score: " + score;
                    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
                    let a = 2;
                    let b = 16;
                    food = {x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())}
                }
            }
        }
    }
    // Di chuyển thân con rắn
    // Lặp lại toàn bộ cơ thể con rắn , chuyển từng phần tử một từ cuối
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x ;
    snakeArr[0].y += inputDir.y ;

    // Part 2: Trưng bày con rắn và thức ăn
    // Trưng bày con rắn
    board.innerHTML = "";
    // Màu ô nền
    for (let i = 1; i < rowBoard + 1 ; i++) {
        for (let j = 1; j < columnBoard + 1 ; j++) {
            let colorX = 0 ;
            let colorY = 0 ;

            color = document.createElement('div');
            color.style.gridRowStart = i;
            color.style.gridColumnStart = j;
            if ((i + j) % 2 === 0 ){
                // #FFEFD5 #AFEEEE #FFE4E1 #E0FFFF #E6E6FA FFB6C1 d9a79c #f5dbd8
                color.style.background = "#fdb7b7";
                color.style.border = "1px solid palevioletred";
            }else {
                color.style.background = "while";
            }
            // color.src = "brick/brick_1.png";
            // color.classList.add('brick')
            board.appendChild(color);
        }
    }
    // Thực hiện thêm phần thân cho con rắn
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('img');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.src= "snakeHead1.png";
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.src= "snakeBody1.png" ;
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Hiển thị thức ăn
    foodElement = document.createElement('img');

    let row = food.y;
    let column = food.x;

    // [ 5-6 ; 11-10 ; 7-16 ; 16-3 ; 16-14]
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[i].x === food.x && snakeArr[i].y === food.y
            || 5 === food.x && 6 === food.y
            || 11 === food.x && 10 === food.y
            || 7 === food.x && 16 === food.y
            || 16 === food.x && 3 === food.y
            || 16 === food.x && 14 === food.y){

            row =  food.x;
            column = food.y;
            break;
        }
    }
    // Cập nhật vị trí của food
    foodElement.style.gridRowStart = row;
    foodElement.style.gridColumnStart = column;

    // Lấy số -> hiển thị thức ăn khác nhau
    const countFood = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21',
    '22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41'];

    if (randomFood === countFood[countFood.length - 3 ] || randomFood > countFood[countFood.length - 3 ]){
        for(var j = 0; j < countFood.length - 1 ; j++) {
            let random = countFood[Math.floor(Math.random() * countFood.length )];
            randomFood = random;
            break;
        }
    }
    // Cập nhật vị trí của thức ăn trong khung hình
    foodElement.src = "food/b"+countFood[randomFood]+".png";
    foodElement.classList.add('food')
    board.appendChild(foodElement);

    // treeElement = document.createElement('img');

    // [ 5-6 ; 11-10 ; 7-16 ; 16-3 ; 16-14]
    // Thêm chướng ngại vật
    if(    5 !== food.x && 6 !== food.y
        || 11 !== food.x && 10 !== food.y
        || 7 !== food.x && 16 !== food.y
        || 16 !== food.x && 4 !== food.y
        || 16 !== food.x && 12 !== food.y
        || 2 === food.x && 3 === food.y){

        for (let i = 0; i < tree.length; i++) {
            if (i === 3 || i === 5){
                treeElement = document.createElement('img');
                treeElement.style.gridRowStart = tree[i].y;
                treeElement.style.gridColumnStart = tree[i].x;
                treeElement.src = "home/home" + i + ".png";
                treeElement.classList.add('impediment')
                board.appendChild(treeElement);
            }else if (i === 4){
                treeElement = document.createElement('img');
                treeElement.style.gridRowStart = tree[i].y;
                treeElement.style.gridColumnStart = tree[i].x;
                treeElement.src = "brick/tree3.png";
                treeElement.classList.add('impediment')
                board.appendChild(treeElement);
            }else { // 7 8 12 11 -- 10 9
                treeElement = document.createElement('img');
                treeElement.style.gridRowStart = tree[i].y;
                treeElement.style.gridColumnStart = tree[i].x;
                treeElement.src = "brick/tree1.png";
                treeElement.classList.add('impediment')
                board.appendChild(treeElement);
            }
        }
    }

    // Chướng ngại vật -> LEVEL 2
    obstacle = document.createElement('img');
    obstacle.style.gridRowStart = impediment.y;
    obstacle.style.gridColumnStart = impediment.x;

    obstacle.src = "home/home1.png";
    obstacle.classList.add('impediment')
    board.appendChild(obstacle);

    // Chướng ngại vật -> LEVEL 2
    obstacle_1 = document.createElement('img');
    obstacle_1.style.gridRowStart = impediment_1.y;
    obstacle_1.style.gridColumnStart = impediment_1.x;

    obstacle_1.src = "brick/tree2.png";
    obstacle_1.classList.add('impediment')
    board.appendChild(obstacle_1);

    // Chướng ngại vật -> LEVEL 2
    obstacle_2 = document.createElement('img');
    obstacle_2.style.gridRowStart = impediment_2.y;
    obstacle_2.style.gridColumnStart = impediment_2.x;

    obstacle_2.src = "home/home7.png";
    obstacle_2.classList.add('impediment')
    board.appendChild(obstacle_2);

    // Chướng ngại vật -> LEVEL 2
    obstacle_3 = document.createElement('img');
    obstacle_3.style.gridRowStart = impediment_3.y;
    obstacle_3.style.gridColumnStart = impediment_3.x;

    obstacle_3.src = "home/home6.png";
    obstacle_3.classList.add('impediment')
    board.appendChild(obstacle_3);

// Chướng ngại vật -> LEVEL 2
    obstacle_4 = document.createElement('img');
    obstacle_4.style.gridRowStart = impediment_4.y;
    obstacle_4.style.gridColumnStart = impediment_4.x;

    obstacle_4.src = "home/home2.png";
    obstacle_4.classList.add('impediment')
    board.appendChild(obstacle_4);

    // score >= '35' -> Điều kiện để game tự động đổi qua level 3
    if (score >= 35){
        window.location = "SNAKE_3.html";
    }

    // Part 1: Cập nhật mảng rắn & Thức ăn ( isCollide(snakeArr) -> true nếu con rắn va chạm vào chính nó hoặc là va vào tường )
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; // giá trị input về giá trị ban đầu
        // Thông báo người chơi thua cuộc
        alert("Game Over !");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();

        let score_Box = localStorage.getItem("score_Box");
        let score_Val = score ;
        localStorage.setItem("score_Box", JSON.stringify(score_Val));
        scoreVal = JSON.parse(score_Box);

        score = 0; // Thiết lập lại điểm có giá trị ban đầu bằng 0
        randomFood = score ;
        // -> Chuyển hướng về màn hình kết quả
        window.location = "result.html";
    }
}

// Điểm cao nhất người chơi đạt được qua các level
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High: " + hiscore;
}
// Hiển thị số level đạt dc
let level = localStorage.getItem("levelBox");
let levelval = 2 ;
localStorage.setItem("levelBox", JSON.stringify(levelval));
levelval = JSON.parse(level);

// Di chuyển con rắn lên - xuống - sang trái - sang phải bằng bàn phím máy tính
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Bắt đầu trò chơi
    // moveSound.play();
    switch (e.key) {
        // Di chuyển con rắn theo hướng lên trên
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        // Di chuyển con rắn theo hướng xuống dưới
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        // Di chuyển con rắn theo hướng sang trái
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        // Di chuyển con rắn theo hướng sang phải
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});

