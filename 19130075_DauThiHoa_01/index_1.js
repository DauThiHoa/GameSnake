// Hằng số và biến trò chơi
let fas = document.querySelector('.fa-angle-double-right');
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('eat.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('bg-music.mp3');
// const moveSound = new Audio('bg-music.mp3');

// const board = document.getElementById('board');
// Số dòng và số cột trong khung chơi của con rắn
let rowBoard = 18 ;
let columnBoard = 18 ;

let speed = 5; // Tốc độ rắn
let score = 0; // Tổng số thức ăn
let randomFood = score ; // Hiển thị nhiều hình ảnh khác nhau của thức ăn
let lastPaintTime = 0; // Thời gian cuối cùng

// Không cho snake hoặc thức ăn xuất hiện ở đường viền giới hạn
// snake => [1,18]
// food => [1,18]

// Xuất hiện vị trí random của snake oishi
let snakeArr = [
    // Rắn
    {x: Math.ceil(Math.random() * ( 18 - 1 ) + 1 ), y: Math.ceil(Math.random() * ( 18 - 1 ) + 1 )}
];
// Xuất hiện vị trí random của thức ăn
let food = {x: Math.ceil(Math.random() * ( 18 - 1 ) + 1 ), y: Math.ceil(Math.random() *  ( 18 - 1 ) + 1 )};

// Chức năng trò chơi
    function main(ctime) {
        // Yêu cầu khung hình
        window.requestAnimationFrame(main);
        musicSound.play();
        // console.log(ctime)
        // Ctime là thời gian hiện tại
        if ((ctime - lastPaintTime) / 1000 < 1 / speed) { // Tốc độ của con rắn
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
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                return true;
            }
        }
        // Nếu rắn chạm vào vạch giới hạn trong khung chơi ( tường )
        if (snake[0].x >= 19 || snake[0].x <= 0 || snake[0].y >= 19 || snake[0].y <= 0) {
            return true;
        }
        return false;

    }

    // Cập nhật lại số điểm và hiển thị lại vị trí của rắn và thức ăn
    function gameEngine() {

        // Nếu rắn đã ăn thức ăn, hãy tăng số điểm và tái tạo thức ăn
        if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
            foodSound.play();
            score += 1;
            randomFood = score;
            // biến localstorage : để lưu trữ điểm cao từ bộ nhớ cục bộ
            if (score > hiscoreval) {
                hiscoreval = score;
                localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                hiscoreBox.innerHTML = "High: " + hiscoreval;
            }
            scoreBox.innerHTML = "Score: " + score;
            // Bất cứ khi nào rắn ăn thức ăn, sẽ thêm một đầu vào nó bằng cách sử dụng hàm unshift ()
            snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
            // Sau khi con rắn ăn thức ăn, sẽ tái tạo thức ăn bằng cách tạo ra các giá trị ngẫu nhiên giữa a và b
            let a = 2;
            let b = 16;
            food = {x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())}

        }

        // Nếu thức ăn xuất hiện trên thân của con rắn
        for (let i = 1; i < snakeArr.length; i++) {
            if (snakeArr[i].x === food.x && snakeArr[i].y === food.y) {
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

        // Di chuyển thân con rắn
        // Lặp lại toàn bộ cơ thể con rắn , chuyển từng phần tử một từ cuối
        for (let i = snakeArr.length - 2; i >= 0; i--) {
            snakeArr[i + 1] = {...snakeArr[i]};
        }

        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;

        // Part 2: Trưng bày con rắn và thức ăn
        // Trưng bày con rắn
        board.innerHTML = "";

        // Màu ô nền
        for (let i = 1; i < rowBoard + 1; i++) {
            for (let j = 1; j < columnBoard + 1; j++) {

                let colorX = 0;
                let colorY = 0;

                color = document.createElement('div');
                color.style.gridRowStart = i;
                color.style.gridColumnStart = j;

                // Khung viền giới hạn
                // if ((i + j) % 2 === 0 && i !== 1 && j !== 1 && i !== 18 && j !== 18) {
                if ((i + j) % 2 === 0) {
                    // #FFEFD5 #AFEEEE #FFE4E1 #E0FFFF #66CDAA #E6E6FA f7bdaf #89cefa f5dbd8 cff4fc 86c3d4 c3e0e6
                    color.style.background = "while";
                }
                // Khung viền giới hạn
                // else if (i === 1 || j === 1 || i === 18 || j === 18) {
                    // color = document.createElement('img');
                    // color.src = "brick/brick_2.png";
                    // color.classList.add('limit');
                // }
                else {
                    color.style.background = "#AFEEEE";
                    color.style.border = "1px solid #86c3d4";
                }
                // color.src = "brick/brick_1.png";
                color.classList.add('brick')
                board.appendChild(color);
            }
        }

/*
        for (let i = 0; i < rowBoard + 1 ; i++) {
            for (let j = 0; j < columnBoard + 1; j++) {

                if (i === 0 || j === 0 || i === 19 || j === 19) {
                    brick = document.createElement('img');
                    brick.style.gridRowStart = i;
                    brick.style.gridColumnStart = j;
                    brick.src = "brick/brick_2.png";
                    brick.classList.add('food')
                    board.appendChild(brick);
                }
            }
        }
 */

        // Thực hiện thêm phần thân cho con rắn
        snakeArr.forEach((e, index) => {
            snakeElement = document.createElement('img');
            snakeElement.style.gridRowStart = e.y;
            snakeElement.style.gridColumnStart = e.x;

            if (index === 0) {
                snakeElement.src = "snakeHead.png";
                snakeElement.classList.add('head');
            } else {
                snakeElement.src = "snakeBody.png";
                snakeElement.classList.add('snake');
            }
            board.appendChild(snakeElement);
        });

        // Hiển thị thức ăn
        foodElement = document.createElement('img');

        let row = food.y;
        let column = food.x;

        for (let i = 1; i < snakeArr.length; i++) {
            if (snakeArr[i].x === food.x && snakeArr[i].y === food.y) {
                row = food.x;
                column = food.y;
                break;
            }
        }
        // Cập nhật vị trí của food
        foodElement.style.gridRowStart = row;
        foodElement.style.gridColumnStart = column;

        const countFood = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21',
            '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41'];

        // Lấy số -> hiển thị thức ăn khác nhau
        if (randomFood === countFood[countFood.length - 3] || randomFood > countFood[countFood.length - 3]) {
            for (var i = 0; i < countFood.length - 1; i++) {
                let random = countFood[Math.floor(Math.random() * countFood.length)];
                randomFood = random;
                break;
            }
        }
        // Cập nhật vị trí của thức ăn trong khung hình
        foodElement.src = "food/b" + countFood[randomFood] + ".png";
        foodElement.classList.add('food')
        board.appendChild(foodElement);

        // score >= '25' -> Điều kiện để game tự động đổi qua level 2
        if (score >= 25) {
            window.location = "SNAKE_2.html";
        }

        // Part 1: Cập nhật mảng rắn & Thức ăn ( isCollide(snakeArr) -> true nếu con rắn va chạm vào chính nó hoặc là va vào tường )
        if (isCollide(snakeArr)) {
            gameOverSound.play();
            musicSound.pause();
            inputDir = {x: 0, y: 0}; // giá trị input về giá trị ban đầu
            // Thông báo người chơi thua cuộc
            alert("Game Over !");
            snakeArr = [{x: 13, y: 15}];
            musicSound.play();

            let score_Box = localStorage.getItem("score_Box");
            let score_Val = score;
            localStorage.setItem("score_Box", JSON.stringify(score_Val));
            scoreVal = JSON.parse(score_Box);

            score = 0; // Thiết lập lại điểm có giá trị ban đầu bằng 0
            randomFood = score;
            // -> Chuyển hướng về màn hình kết quả
            window.location = "result.html";
        }

    }

// Điểm cao nhất người chơi đạt được qua các level
    musicSound.play();
    let hiscore = localStorage.getItem("hiscore");
    if (hiscore === null) {
        hiscoreval = 0;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
    } else {
        hiscoreval = JSON.parse(hiscore);
        hiscoreBox.innerHTML = "High: " + hiscore;
    }

// Hiển thị số level đạt dc
    let level = localStorage.getItem("levelBox");
    let levelval = 1;
    localStorage.setItem("levelBox", JSON.stringify(levelval));
    levelval = JSON.parse(level);


    // Di chuyển con rắn lên - xuống - sang trái - sang phải bằng bàn phím máy tính
    window.requestAnimationFrame(main);
    window.addEventListener('keydown', e => {
        inputDir = {x: 0, y: 1} // Bắt đầu trò chơi
        // moveSound.play();
        // musicSound.play();
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


