window.onload = function() {

    var step = 0;
    var canDo = true;
    var canChangeBcPic = true;
    var canGameOver = false;
    // 随机位置数组
    var POS = new Array(16);
    var GameOverButton = document.getElementsByClassName("init")[0];


    var BcPic = document.getElementsByClassName("backgroundPicture");
    // 记录开始游戏后的游戏图片相对位置数组
    var relativePIC = new Array(16);
    // 存放15张图片的数组
    var pic = document.getElementsByClassName("pic");

    initLayout();

    // 点击开始按钮
    document.getElementsByClassName("restart")[0].onclick = function() {
      canChangeBcPic = false;
        // 初始化布局
        initGame();
        // 开始
        play();
        canGameOver = true;
        GameOverButton.onclick = function() {
          if (canGameOver) {
            for (var j = 0; j < pic.length; ++j) {
              pic[j].id = "pos" + ((j + 1) + "");
                pic[j].className = 'm' + pic[j].className.substr(1);
            }
            canChangeBcPic = true;
            canGameOver = false;
            canDo = false;
            alert("You lose!\nYour step:" + step);
            step = 0;
            stepCount(0);
          }
        }
    };

    function initLayout() {
      for (var i = 0; i < BcPic.length; ++i) {
          BcPic[i].onclick = function(i) {
              return function() {
                  if (canChangeBcPic) {
                    (function() {
                        // alert(pic.length);
                        for (var j = 0; j < pic.length; ++j) {
                          // alert(pic.length);
                            pic[j].className = BcPic[i].className[18] + pic[j].className.substr(1);
                            // pic[i].className = "pic " + "pic" + ((POS[i]) + "");
                            // pic[i].id = "pos" + ((POS[i]) + "");
                        }
                        // pic[15].id = "pos16";
                    })();
                  } else {
                    alert("Please finished the current picture!");
                  }
              };
          }(i);
        }
    }

    // 计步器
    function stepCount(i) {
        step += i;
        document.getElementsByClassName("step")[0].innerHTML = (step + "");
    }

    // 开始游戏等待用户点击
    function play() {
        for (var i = 0; i < pic.length; ++i) {
            pic[i].onclick = function(i) {
                return function() {
                    if (canDo && canMove(this.id.substr(3) - 1 + 1, document.getElementsByClassName("blank")[0].id.substr(3) - 1 + 1)) {
                        move(this, document.getElementsByClassName("blank")[0]);
                        if (isEnd())
                            endPlay();
                    }
                };
            }(i);
        }
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
        var distance = (originPos > distinationPos) ? originPos - distinationPos : distinationPos - originPos;
        var min = (originPos > distinationPos) ? distinationPos : originPos;
        var max = (originPos < distinationPos) ? distinationPos : originPos;
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


    // 初始化游戏布局
    function initGame() {
        step = 0;
        stepCount(0);
        canDo = true;
        // 洗牌算法产生随机序列
        var index, tmp, i;
        do {
            for (i = 1; i <= 15; ++i) {
                POS[i - 1] = i;
            }
            for (i = 15 - 1; i > 0; i--) {
                index = GetRandomNum(1, 15) % i;
                tmp = POS[i];
                POS[i] = POS[index];
                POS[index] = tmp;
            }
            for (i = 0; i < 15; ++i) {
                relativePIC[POS[i]] = i + 1;
            }
            POS[15] = -1;
            relativePIC[15] = -1;
        } while (!isPlayAble());

        // IFEE 开始初始化布局
        (function() {
            for (var i = 0; i < pic.length - 1; ++i) {
                // pic[i].className = "pic " + "pic" + ((POS[i]) + "");
                pic[i].id = "pos" + ((POS[i]) + "");
            }
            pic[15].id = "pos16";
        })();
    }

    // 判断生成的布局是否可行
    function isPlayAble() {
        var Tsum = 0,
            i, j;
        for (i = 0; i < 14; ++i) {
            for (j = i + 1; j < 15; ++j) {
                if (relativePIC[j] < relativePIC[i]) Tsum++;
            }
        }
        return (Tsum % 2 == 0);
    }

    // 随机数产生
    function GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.floor(Rand * Range));
    }
};
