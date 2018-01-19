var shareLink = 'http://m.wecarepet.com';

(function () {
    API.get('/data/ticket', null, function(result){

        // console.log(result.value);

        initWeixin(result.value, function(){
            GLOBAL.wx_inited = true;
            wx.onMenuShareTimeline({
                "title": "什么？宠物问题？点这里问萌爪！无论是疾病，行为还是营养问题，千字、论文级别的详细建议来自萌爪医生。",
                "link": shareLink,
                "imgUrl": 'http://www.wecarepet.com/images/indexShare.png',
                success: function () {
                    MtaH5.clickShare('wechat_moments');
                },
                cancel: function () {
                }
            });
            wx.onMenuShareAppMessage({

                "title":"什么？宠物问题？点这里问萌爪！",
                "link": shareLink,
                "desc": "无论是疾病，行为还是营养问题，千字、论文级别的详细建议来自萌爪医生。",
                "imgUrl": 'http://www.wecarepet.com/images/indexShare.png',
                success: function () {
                    // 用户确认分享后执行的回调函数
                    MtaH5.clickShare('wechat_friend');
                },
                cancel: function () {
                }
            });
        }, GLOBAL.develop, false);

    }, function(err){
        console.log(err);
    });
})();

