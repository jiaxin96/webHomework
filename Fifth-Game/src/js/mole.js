var StartCount = 0;
var Score = 0;

window.onload = function() {
  // 等待用户触发开始按钮
  wait();
}

function wait() {
  // 得到开始按钮对象
  var lunch = document.getElementsByClassName("startAndEnd")[0];
  // 判断是开始还是结束
  lunch.onclick = function() {
      StartCount = (StartCount + 1)%2;
      if (StartCount % 2 == 1) {
          initGame();
          play(GetRandomNum(1, 60));
      } else {
          stopPlay();
      }
    };
}


// 初始化时间 分数状态
function initGame() {
    Score = 0;
    document.getElementsByClassName("timeCount")[0].innerHTML = "30";
    document.getElementsByClassName("state")[0].innerHTML = "Playing!";
    document.getElementsByClassName("socreCount")[0].innerHTML = "0";
    clock = setInterval(timeCounter, 1000);
    stop = setTimeout(function() {
        stopPlay();
    }, 30000);
}

// 计时器
function timeCounter() {
    var displayTime = document.getElementsByClassName("timeCount")[0];
    var temp = displayTime.innerHTML;
    displayTime.innerHTML = temp - 1;
}


// 游戏结算
function stopPlay() {
    clearInterval(clock);
    clearTimeout(stop);
    document.getElementsByClassName("state")[0].innerHTML = "Game Over!";
    alert("Game Over.\nYour score is:" + Score);
}


// 开始游戏
function play(j) {
  // 得到地鼠类
    var mole = document.getElementsByClassName("mole");
    // 产生一个随机数
    var moleNum = GetRandomNum(1, 60);
    mole[j].checked = true;
    for(var i = 0; i < mole.length; ++i) {
      // 闭包 处理点击时间
      (function(i, j){
        if (i == j) {
          // 正确点击
          mole[i].onclick = function() {
            this.checked = false;
            updatescore(1);
            play(GetRandomNum(1, 60));
            return;
          };
          return;
        } else {
          // 错误点击
          mole[i].onclick = function() {
            this.checked = false;
            mole[j].checked = true;
            updatescore(-1);
            return;
          };
        }
      })(i, j);
    }
    return;
}


// 随机数产生器
function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.floor(Rand * Range));
}


// 计分器
function updatescore(i) {
    Score += i;
    var displayScore = document.getElementsByClassName("socreCount")[0];
    var temp = displayScore.innerHTML;
    displayScore.innerHTML = Score + "";
}
