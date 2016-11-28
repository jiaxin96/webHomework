var isStart = false;
var varRoad = 0;
var warring = 0;
window.onload = function() {

  // 等待用户触发S标记
    document.getElementsByClassName("startPos")[0].onmouseover = function() {
        document.getElementsByClassName("hint")[0].innerHTML = "";
        isStart = true;
        play();
    };
}

//结束游戏 提示框显示触发E标记时的游戏状态
function endPlay() {
  if(isStart) {
    if (warring > 0) {
        document.getElementsByClassName("hint")[0].innerHTML = "You lose!";
    } else if (varRoad < document.getElementsByClassName("road").length) {
        document.getElementsByClassName("hint")[0].innerHTML = "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!";
    } else {
        document.getElementsByClassName("hint")[0].innerHTML = "You win!";
    }
}
    return;
}


// 开始游戏 记录走过的路径数和碰到的墙数
function play() {
    varRoad = 0;
    warring = 0;
    document.getElementsByClassName("endPos")[0].onmouseover = function() {
        endPlay();
        isStart =false;
        return;
    };
    // 游戏是否启动
    if (!isStart) return;

    //得到墙 路数组
    var wall = document.getElementsByClassName("wall");
    var road = document.getElementsByClassName("road");

    // 遍历墙
    for (var i = 0; i < wall.length; ++i) {
        (function(i) {
            if (!isStart) return;
            wall[i].onmouseover = function() {
                if (!isStart) return;
                var name = this.className.substr(5);
                this.className = "newWall " + name;
                warring++;
                endPlay();
            };
            wall[i].onmouseout = function() {
              var name2 = this.className.substr(5);
              this.className = "wall " + name2;
            };
        })(i);
    }

    // 遍历路
    var y;
    for (y in road) {
        var temp2;
        temp2 = road[y];
        temp2.onmouseover = function() {
            varRoad++;
            return;
        };
    }
    return;
}
