// 问题代码
/*
window.onload = function() {
  var arr = document.getElementsByClassName("SingleButton");
  for (var i = 0; i < arr.length; ++i) {
    arr[i].oncilck = function() {
    appContent(arr[i]);
  }
}
}
*/


// 控制字符的获取和输出
var IsAns = false;

function appContent(td) {
    var content = document.getElementById("outputAns");
    if (IsAns) {
        content.value = "";
        IsAns = false;
    }
    var text = td.innerText;
    if ("←" == text) {
        if (content.value.length > 0) {
            //删除最后一个字符
            content.value = content.value.substring(0, content.innerText.length - 1);
        }
        //如果是全部删除
    } else if ("CE" == text) {
        content.value = "";
        //如果是按了等于号
    } else if ("=" == text) {
      IsAns = true;
        content.value = parse(content.value);
        // try {
        //     content.innerText = eval(content.innerText);
        // } catch (e) {
        //     content.innerText = NaN;
        // }
    } else {
        content.value = content.value + text;
    }
}


// 递归法去除括号来计算表达式的值
function parse(content) {
    //寻找最后一个左括号
    var index = content.lastIndexOf("(");

    //如果等式中有左括号
    if (index > -1) {
        //寻找右括号,从左括号的位置开始寻找
        var endIndex = content.indexOf(")", index);

        //如果等式中有右括号
        if (endIndex > -1) {
            //调用自己算出括号中的结果
            var result = parse(content.substring(index + 1, endIndex));
            //然后继续调用自己,
            //其实这里完成的工作就是"2+3+(2+3*2)"转化成了"2+3+8",也就是用括号中的结果替换括号所在位置
            return parse(content.substring(0, index) + ("" + result) + content.substring(endIndex + 1));
        }
    }

    index = content.indexOf("+");

    if (index > -1) {
        // return parse(content.substring(0, index)) + parse(content.substring(index + 1));
        if (isNaN(parse(content.substring(0, index))) || isNaN(parse(content.substring(index + 1)))) {
            return NaN;
        }
        return accAdd(parse(content.substring(0, index)), parse(content.substring(index + 1)));
    }

    index = content.lastIndexOf("-");

    if (index > -1) {
        // return parse(content.substring(0, index)) - parse(content.substring(index + 1));
        if (isNaN(parse(content.substring(0, index))) || isNaN(parse(content.substring(index + 1)))) {
            return NaN;
        }
        return accSub(parse(content.substring(0, index)), parse(content.substring(index + 1)));
    }

    index = content.lastIndexOf("*");

    if (index > -1) {
        // return parse(content.substring(0, index)) * parse(content.substring(index + 1));
        if (isNaN(parse(content.substring(0, index))) || isNaN(parse(content.substring(index + 1)))) {
            return NaN;
        }
        return accMul(parse(content.substring(0, index)), parse(content.substring(index + 1)));
    }

    index = content.lastIndexOf("/");

    if (index > -1) {
        // return parse(content.substring(0, index)) / parse(content.substring(index + 1));
        if (isNaN(parse(content.substring(0, index))) || isNaN(parse(content.substring(index + 1)))) {
            return NaN;
        }
        return accDiv(parse(content.substring(0, index)), parse(content.substring(index + 1)));
    }

    if ("" === content) {
        return 0;
    } else {
        // string转化为数字的简单处理
        return content - 1 + 1;
    }
}




// 浮点数的精确计算处理
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}

function accSub(arg1, arg2) {
    return accAdd(arg1, -arg2);
}

function accMul(arg1, arg2) {
    var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    } catch (e) {}
    try {
        m += s2.split(".")[1].length;
    } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

function accDiv(arg1, arg2) {
    var t1 = 0,
        t2 = 0,
        r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    } catch (e) {}
    try {
        t2 = arg2.toString().split(".")[1].length;
    } catch (e) {}
    with(Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    }
}
