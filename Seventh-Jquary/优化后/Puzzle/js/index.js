window.onload = function() {
    createGlobalVar();
    initLayout();
    // 点击开始按钮
    $(".restart").click(function(event) { ubindClick(); start();});
};

function initLayout() {
    $(BcPic).click(function(event) {
        var that = $(this);
        if (canChangeBcPic)
            $(pic).each(function(index, el) {
                pic[index].className = that.attr('class')[18] + pic[index].className.substr(1);
            });
        else
            alert("Please finished the current picture!");
    });
}

function bindClick() {
  $(pic).each(function(index, el) {
        $(pic[index]).bind('click', function(event) {
            var that = event.target;
            if (canMove(that.id.substr(3) - 1 + 1, document.getElementsByClassName("blank")[0].id.substr(3) - 1 + 1)) {
                move(that, document.getElementsByClassName("blank")[0]);
            }
        });
    });
}
function ubindClick() {
    $(pic).each(function(index, el) {
        $(pic[index]).unbind('click');
    });
}
    // 初始化游戏布局
    function initGame() {
        updataStep(0,0);
        bindClick();
        for (var i = 0; i < 1000; ++i) {
            $(pic[GetRandomNum(0,15)]).click();
        }
        ubindClick();
        updataStep(0,0);
    }

    function start() {
        canDo = true;
        canChangeBcPic = false;
        initGame();
        play();
        canGameOver = true;
        $('.init').click(function(event) {
            ubindClick();
            if (canGameOver) updataGlobleVar();
        });
    }

// 开始游戏等待用户点击
function play() {
    $(pic).each(function(index, el) {
        $(pic[index]).bind('click', function(event) {
            var that = event.target;
            if (canDo && canMove(that.id.substr(3) - 1 + 1, document.getElementsByClassName("blank")[0].id.substr(3) - 1 + 1)) {
                move(that, document.getElementsByClassName("blank")[0]);
                if (isEnd()) endPlay();
            }
        });
    });
}

// 计步器
function stepCount(i) {
    step += i;
    $(".step").html(step);
}

function endPlay() {
    alert("You win!");
    canDo = false;
    canChangeBcPic = true;
}

function isEnd() {
    for (var i = 0; i < pic.length; ++i) {
        if ((pic[i].id.substr(3) - 1 + 1) != (i + 1)) return false;
    }
    return true;
}


// 判断是否可以移动
function canMove(originPos, distinationPos) {
    var distance = Math.abs(originPos - distinationPos);
    var min = Math.min(originPos,distinationPos);
    var max = Math.max(originPos,distinationPos);
    if (distance == 1 && (min % 4 == 0 && max % 4 == 1)) return false;
    if (distance == 4 || distance == 1) return true;
    return false;
}

// 移动函数
function move(origin, distination) {
    stepCount(1);
    var tempId = origin.id;
    origin.id = distination.id;
    distination.id = tempId;
}

function createGlobalVar() {
    step = 0;
    canDo = canChangeBcPic = true;
    canGameOver = false;
    BcPic = document.getElementsByClassName("backgroundPicture");
    // 存放15张图片的数组
    pic = document.getElementsByClassName("pic");
}
    // i 是当前的值 j是要增加的值
    function updataStep(i, j) {
        step = i;
        stepCount(j);
    }
    function updataGlobleVar() {
      initPic();
      canChangeBcPic = true;
      canGameOver = canDo = false;
      alert("Game over!\nYour step:" + step);
      updataStep(0, 0);
  }
function initPic() {
    for (var j = 0; j < pic.length; ++j) {
      pic[j].id = "pos" + ((j + 1) + "");
      pic[j].className = 'm' + pic[j].className.substr(1);
  }
}
// // 随机数产生
function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.floor(Rand * Range));
}