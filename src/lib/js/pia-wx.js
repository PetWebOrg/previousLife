// import $ from 'jquery';//webpack2规定 import 不能与module.exports混用
var $ = require('jquery');

function initWeixin(callback,develop,debug){
    function init(){
        var timestamp=parseInt((new Date()).getTime() *0.001);
        var nonceStr = randomStr();
        $.ajax({
          type: "get",
          url: "http://social.wecarepet.com/api/core/wx/jsapi_ticket",//服务器配置JSSDK的地址
          // async: false,
          dataType:'json',
          data:{"url":location.href},
          success: function (data) {
            var jsapi_ticket = data.value;
            wx.config({
              debug: (debug == null)?false:debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: develop?"wxcf3f3268e44678a6":'wx22a43bc9a638e4f4', // 必填，公众号的唯一标识
              timestamp: timestamp, // 必填，生成签名的时间戳
              nonceStr: nonceStr, // 必填，生成签名的随机串
              signature: getSignature(timestamp,nonceStr,jsapi_ticket),// 必填，签名，见附录1
              jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","chooseImage","checkJsApi","uploadImage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
          }
        });
    }
    function getSignature(timestamp,nonceStr,jsapi_ticket){
        var str = "jsapi_ticket="+jsapi_ticket+"&noncestr="+nonceStr+"&timestamp="+timestamp+"&url="+location.href.split('#')[0];
        return sha1(str);

    }
    function randomStr(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
    init();

    function utf8_encode(argString) {

        if (argString === null || typeof argString === 'undefined') {
            return '';
        }

        var string = (argString + ''); // .replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        var utftext = '',
            start, end, stringl = 0;

        start = end = 0;
        stringl = string.length;
        for (var n = 0; n < stringl; n++) {
            var c1 = string.charCodeAt(n);
            var enc = null;

            if (c1 < 128) {
                end++;
            } else if (c1 > 127 && c1 < 2048) {
                enc = String.fromCharCode(
                    (c1 >> 6) | 192, (c1 & 63) | 128
                );
            } else if ((c1 & 0xF800) !==0xD800) {
                enc = String.fromCharCode(
                    (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                );
            } else { // surrogate pairs
                if ((c1 & 0xFC00) !==0xD800) {
                    throw new RangeError('Unmatched trail surrogate at ' + n);
                }
                var c2 = string.charCodeAt(++n);
                if ((c2 & 0xFC00) !==0xDC00) {
                    throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
                }
                c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
                enc = String.fromCharCode(
                    (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                );
            }
            if (enc !== null) {
                if (end > start) {
                    utftext += string.slice(start, end);
                }
                utftext += enc;
                start = end = n + 1;
            }
        }

        if (end > start) {
            utftext += string.slice(start, stringl);
        }

        return utftext;
    }
    function sha1(str) {


        var rotate_left = function(n, s) {
            var t4 = (n << s) | (n >>> (32 - s));
            return t4;
        };

        var cvt_hex = function(val) {
            var str = '';
            var i;
            var v;

            for (i = 7; i >= 0; i--) {
                v = (val >>> (i * 4)) & 0x0f;
                str += v.toString(16);
            }
            return str;
        };

        var blockstart;
        var i, j;
        var W = new Array(80);
        var H0 = 0x67452301;
        var H1 = 0xEFCDAB89;
        var H2 = 0x98BADCFE;
        var H3 = 0x10325476;
        var H4 = 0xC3D2E1F0;
        var A, B, C, D, E;
        var temp;

        str = utf8_encode(str);
        var str_len = str.length;

        var word_array = [];
        for (i = 0; i < str_len - 3; i += 4) {
            j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
            word_array.push(j);
        }

        switch (str_len % 4) {
            case 0:
                i = 0x080000000;
                break;
            case 1:
                i = str.charCodeAt(str_len - 1) << 24 | 0x0800000;
                break;
            case 2:
                i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 0x08000;
                break;
            case 3:
                i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) <<
                    8 | 0x80;
                break;
        }

        word_array.push(i);

        while ((word_array.length % 16) !== 14) {
            word_array.push(0);
        }

        word_array.push(str_len >>> 29);
        word_array.push((str_len << 3) & 0x0ffffffff);

        for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
            for (i = 0; i < 16; i++) {
                W[i] = word_array[blockstart + i];
            }
            for (i = 16; i <= 79; i++) {
                W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
            }

            A = H0;
            B = H1;
            C = H2;
            D = H3;
            E = H4;

            for (i = 0; i <= 19; i++) {
                temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }

            for (i = 20; i <= 39; i++) {
                temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }

            for (i = 40; i <= 59; i++) {
                temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }

            for (i = 60; i <= 79; i++) {
                temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }

            H0 = (H0 + A) & 0x0ffffffff;
            H1 = (H1 + B) & 0x0ffffffff;
            H2 = (H2 + C) & 0x0ffffffff;
            H3 = (H3 + D) & 0x0ffffffff;
            H4 = (H4 + E) & 0x0ffffffff;
        }

        temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
        return temp.toLowerCase();
    }

}
function updataShare(shareInfo) {
  if(typeof shareInfo == 'undefined'){
    shareInfo = {
      shareSrc:'http://img.wecarepet.com/double11/share0.jpg',
      shareText:'你和TA的缘分，其实从上辈子就开始了……',
      shareTitle:'你和TA的缘分，其实从上辈子就开始了……',
      shareDesc:'TA上辈子和你是情敌？陌路？爱人？还是塑料姐妹花？快来测一发！'
    }
  }else{
    shareInfo = {
      shareSrc:shareInfo.shareSrc,
      shareText:'你和TA的缘分，其实从上辈子就开始了……',
      shareTitle:'原来TA上辈子跟我居然是这种关系……怪不得……',
      shareDesc:'TA上辈子和你是情敌？陌路？爱人？还是塑料姐妹花？快来测一发！'
    }
  }
  var shareOrigin = 'http://wecarepet.com/H5GameH5Game/previousLife/index.html#/';
  wx.ready(function () {
    //朋友圈
    wx.onMenuShareTimeline({
      title:shareInfo.shareText ,
      link: shareOrigin,
      imgUrl:shareInfo.shareSrc,
      success: function () {
        if(typeof MtaH5 != 'undefined') MtaH5.clickStat("event15")
        if(typeof ga != 'undefined') ga('send', 'event','分享朋友圈成功','click',null);
      },
      cancel: function () {
      }
    });
    // 好友
    wx.onMenuShareAppMessage({
      title:shareInfo.shareTitle,
      desc: shareInfo.shareDesc,
      link: shareOrigin,
      imgUrl:shareInfo.shareSrc,
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        if(typeof MtaH5 != 'undefined') MtaH5.clickStat("event14")
        if(typeof ga != 'undefined') ga('send', 'event','分享朋友成功','click',null);
      },
      cancel: function () {
      }
    });
  });
};
export default {
  initWeixin:initWeixin,
  updataShare:updataShare
}




