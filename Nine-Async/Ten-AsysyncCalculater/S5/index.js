window.onload = function() {
  $(function () {
    $('.icon').mouseenter(initLayout);
    $('.button').click(dealButtoncilck);
    $('#info-bar').click(dealInforBar);
    $('#apb').click(autoAction);
  });
};

function initLayout() {
  $('#info-bar').addClass('disabled');
  $('#message').html('');
  $('#sum').html('');
  $('.button').children('span').hide();
  $('.button').each(function() {
    $(this).removeClass('disabled');
    $(this).children('span').html('...');
  });
}

function dealButtoncilck(event, callback) {
  if (!$(this).hasClass("disabled") && $(this).children("span:hidden").length) {
    $(this).siblings().addClass("disabled");
    $(this).children('span').show();
    var that = this;
    callback =  arguments[1] ? arguments[1] : checkSum;
    $.get('/' + this.id, function(data) {
      if (!$(that).children("span:hidden").length && !$(that).hasClass("disabled")) {
        $(that).addClass('disabled');
        $(that).children('span').html(data);
        $(that).siblings().each(function() {
          if ($(this).children('span:visible').length === 0) {
            $(this).removeClass('disabled');
          }
        });
        callback.call(that);
      }
    });
  }
}

function dealInforBar(event, callback) {
  console.log(event.target);
  if ($(this).hasClass('disabled') === false) {
    var sum = 0;
    $(".button").children('span').each(function () {
     sum += parseInt($(this).html());
   });
    $(".sum").html(sum);
    $(this).addClass("disabled");
    if ($.isFunction(callback)) callback.call(this);
  }
}

function checkSum() {
  var count = 0;
  $('.button').each(function(){
    if ($(this).hasClass('disabled') === true && $(this).children('.button:hidden').length === 0) count++;
  });
  if (count === 5) $('#info-bar').removeClass('disabled');
}

function generateRadomArray(a) {
  for (var i = 4; i > 0; i--) {
    var index = GetRandomNum(0, i) % i;
    var tmp = a[i];
    a[i] = a[index];
    a[index] = tmp;
  }
  return a;
  // var message = '';
  // var radomArr = new Array();
  // while (a.length) {
  //   var RandomSelect = Math.floor(Math.random() * a.length);
  //   message += a[RandomSelect].toString()[9].toUpperCase();
  //   radomArr.push(a[RandomSelect]);
  //   a.splice(RandomSelect, 1);
  // }
  // // $('#message').html(message);
  // return radomArr;
}
    function GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.floor(Rand * Range));
    }
function autoAction() {
  var handOrder = [aHandler, bHandler, cHandler, dHandler, eHandler];
  var randomArray = generateRadomArray(handOrder);
  var callbacks = [];
  for (var i = 0; i < randomArray.length; ++i) {
    (function(i) {
      callbacks[i] = function(instantSum) {
        randomArray[i](instantSum, function(err, instantSum, message) {
          if (err) {
            console.log('err');
            $('#message').html(err.message);
            callbacks[i](err.instantSum);
          } else {
            $('#message').html(message);
            callbacks[i+1](instantSum);
          }
        });
      };
    })(i);
  }
  callbacks[randomArray.length] = function() {
    $('#info-bar').trigger('click', function() {
      $('#message').html('楼主异步调用战斗力感人,目测不超过' + $('.sum').html());
    });
  };
  callbacks[0](0);
}



function aHandler(instantSum, callback) {
  var shownMess = 'A：这是个天大的秘密';
  var errMess = 'A：A has a error';
  $('#A').trigger('click', function() {
    try {
      var MyVaildNum = Math.random()*10;
      if (MyVaildNum < 5) throw 'A can\'t get five';
      checkSum();
      callback(null, instantSum + parseInt($('#A').children("span").html()), shownMess);
    }
    catch(e){
      console.log(e);
      $('#A').removeClass('disabled');
      $('#A').children('span').hide();
      callback({message: errMess, instantSum: instantSum}, instantSum, errMess);
    }
  });
}
function bHandler(instantSum, callback) {
  var shownMess = 'B：我不知道';
  var errMess = 'B：B has a error';
  $('#B').trigger('click', function() {
    try {
      var MyVaildNum = Math.random()*10;
      if (MyVaildNum > 5) throw 'B can\'t less than five';
      checkSum();
      callback(null, instantSum + parseInt($('#B').children("span").html()), shownMess);
    }
    catch(e) {
      console.log(e);
      $('#B').removeClass('disabled');
      $('#B').children('span').hide();
      callback({message: errMess, instantSum: instantSum}, instantSum, errMess);
    }
  });
}
function cHandler(instantSum, callback) {
  var shownMess = 'C：你不知道', errMess = 'C：C has a error';
  $('#C').trigger('click', function() {
    try {
      var MyVaildNum = Math.random()*10;
      if (MyVaildNum == 5) throw 'C can\'t be five';
      checkSum();
      callback(null, instantSum + parseInt($('#C').children("span").html()), shownMess);
    }
    catch(e) {
      console.log(e);
      $('#C').removeClass('disabled');
      $('#C').children('span').hide();
      callback({message: errMess, instantSum: instantSum}, instantSum, errMess);
    }
  });
}
function dHandler(instantSum, callback) {
  var shownMess = 'D：他不知道', errMess = 'D：D has a error';
  $('#D').trigger('click', function() {
    try {
      var MyVaildNum = Math.random()*10;
      if (MyVaildNum > 9.8) throw 'D is Da Lao';
      checkSum();
      callback(null, instantSum + parseInt($('#D').children("span").html()), shownMess);
    }
    catch(e) {
      console.log(e);
      $('#D').removeClass('disabled');
      $('#D').children('span').hide();
      callback({message: errMess, instantSum: instantSum}, instantSum, errMess);
    }
  });
}
function eHandler(instantSum, callback) {
  var shownMess = 'E：才怪', errMess = 'E has a error';
  $('#E').trigger('click', function() {
    try {
      var MyVaildNum = Math.random()*10;
      if (MyVaildNum < 0.2) throw 'E is xiao di';
      checkSum();
      callback(null, instantSum + parseInt($('#E').children("span").html()), shownMess);
    }
    catch(e) {
      console.log(e);
      $('#E').removeClass('disabled');
      $('#E').children('span').hide();
      callback({message: errMess, instantSum: instantSum}, instantSum, errMess);
    }
  });
}

