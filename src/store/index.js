import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'


Vue.use(Vuex)

const state = {
  userview:{
    userId:null,

    // avatarBefore:'',//头像裁剪前
    avatar:'',
    currentQusNum:0,
    answers:[],//用户选择的答案
    score:0,//总分
    qusNumTotal:6
  },
  result:{
    beforeDrawAvatar:'',//根据分数档，随机出来的结果图信息
    afterDrawAvatar:''//跟用户头像拼接后
  },
  level:{
    low: 16, //6-16虐心组
    middle: 20, //17-20 路人组
    high: 21,//21-24 暖心组
    mylevel: 'low'
  },
  Question:[
    {
      question:'../../images/question0.png',
      Q:'../../images/img/Q0.png',
      options:[
        {id:0, text:'虎躯一震，脑电波噼里啪啦直击灵魂', score:4},
        {id:1, text:'很亲切，仿佛在哪里见过Ta呢', score:3},
        {id:2, text:'内心毫无波动，甚至还有点想笑', score:2},
        {id:3, text:'隐隐感觉到自己要倒大霉了', score:1}
      ]
    },
    {
      question:'../../images/question1.png',
      Q:'../../images/img/Q1.png',
      options:[
        {id:0, text:'Ta不为所动，头都不回', score:1},
        {id:1, text:'瞟你一眼，表情仿佛在说“MDZZ”', score:2},
        {id:2, text:'不情不愿的走过来', score:3},
        {id:3, text:'听见你的声音就很兴奋，随叫随到', score:4},
      ]
    },
    {
      question:'../../images/question2.png',
      Q:'../../images/img/Q2.png',
      options:[
        {id:0, text:'走过来靠在你身边，静静陪伴你', score:3},
        {id:1, text:'使出浑身解数，耍宝卖萌逗你开心', score:4},
        {id:2, text:'不在服务区，无踪可觅', score:1},
        {id:3, text:'马上在地毯上尿尿，让你有事可做走出悲伤', score:2},
      ]
    },
    {
      question:'../../images/question3.png',
      Q:'../../images/img/Q3.png',
      options:[
        {id:0, text:'免费送!', score:1},
        {id:1, text:'论斤卖', score:2},
        {id:2, text:'10個亿', score:3},
        {id:3, text:'打死也不卖！', score:4},
      ]
    },
    {
      question:'../../images/question4.png',
      Q:'../../images/img/Q4.png',
      options:[
        {id:0, text:'走之前先还钱啦！', score:1},
        {id:1, text:'再见，好走不送！', score:2},
        {id:2, text:'下辈子还要跟你在一起！', score:3},
        {id:3, text:'去你妹的选项！老子才不会跟Ta分开！！', score:4},
      ]
    },
    {
      question:'../../images/question5.png',
      Q:'../../images/img/Q5.png',
      options:[
        {id:0, text:'别想了，自己都准备去要饭了!', score:2},
        {id:1, text:'当然会啦！包个大红包给Ta，想吃啥买啥！', score:4},
        {id:2, text:'谁还不是个宝宝，Ta给我才对！', score:1},
        {id:3, text:'随便包点，意思意思！', score:3},
      ]
    }
  ],
  RESULTIMG:{
    low : [//12
      {shareSrc:'http://img.wecarepet.com/double11/share0.jpg',imgSrc:'./static/img/RESULTIMG0.png',x:84,y:168,width:74},
      {shareSrc:'http://img.wecarepet.com/double11/share1.jpg',imgSrc:'./static/img/RESULTIMG1.png',x:132,y:135,width:94},
      {shareSrc:'http://img.wecarepet.com/double11/share2.jpg',imgSrc:'./static/img/RESULTIMG2.png',x:99,y:103,width:131},
      {shareSrc:'http://img.wecarepet.com/double11/share3.jpg',imgSrc:'./static/img/RESULTIMG3.png',x:213,y:91,width:64},
      {shareSrc:'http://img.wecarepet.com/double11/share4.jpg',imgSrc:'./static/img/RESULTIMG4.png',x:113,y:104,width:81},
      {shareSrc:'http://img.wecarepet.com/double11/share5.jpg',imgSrc:'./static/img/RESULTIMG5.png',x:128,y:150,width:95},
      {shareSrc:'http://img.wecarepet.com/double11/share6.jpg',imgSrc:'./static/img/RESULTIMG6.png',x:119,y:150,width:94},
      {shareSrc:'http://img.wecarepet.com/double11/share7.jpg',imgSrc:'./static/img/RESULTIMG7.png',x:207,y:163,width:118},
      {shareSrc:'http://img.wecarepet.com/double11/share8.jpg',imgSrc:'./static/img/RESULTIMG8.png',x:109,y:191,width:84},
      {shareSrc:'http://img.wecarepet.com/double11/share9.jpg',imgSrc:'./static/img/RESULTIMG9.png',x:177,y:102,width:86},
      {shareSrc:'http://img.wecarepet.com/double11/share10.jpg',imgSrc:'./static/img/RESULTIMG10.png',x:88,y:112,width:87}
    ],
    middle : [//4
      {shareSrc:'http://img.wecarepet.com/double11/share11.jpg',imgSrc:'./static/img/RESULTIMG11.png',x:188,y:98,width:102},
      {shareSrc:'http://img.wecarepet.com/double11/share12.jpg',imgSrc:'./static/img/RESULTIMG12.png',x:206,y:187,width:84},
      {shareSrc:'http://img.wecarepet.com/double11/share13.jpg',imgSrc:'./static/img/RESULTIMG13.png',x:211,y:152,width:97},
      {shareSrc:'http://img.wecarepet.com/double11/share14.jpg',imgSrc:'./static/img/RESULTIMG14.png',x:150,y:134,width:127}
    ],
    high : [//4
      {shareSrc:'http://img.wecarepet.com/double11/share15.jpg',imgSrc:'./static/img/RESULTIMG15.png',x:201,y:157,width:77},
      {shareSrc:'http://img.wecarepet.com/double11/share16.jpg',imgSrc:'./static/img/RESULTIMG16.png',x:99,y:129,width:124},
      {shareSrc:'http://img.wecarepet.com/double11/share17.jpg',imgSrc:'./static/img/RESULTIMG17.png',x:204,y:204,width:120},
      {shareSrc:'http://img.wecarepet.com/double11/share18.jpg',imgSrc:'./static/img/RESULTIMG18.png',x:139,y:154,width:90},
    ]
  },
  // RESULTIMG:{
  //   low : [//12
  //     {shareSrc:'http://img.wecarepet.com/double11/share0.jpg',imgSrc:'http://img.wecarepet.com/double11/RESULTIMG0.png',x:84,y:168,width:74},
  //     {shareSrc:'http://img.wecarepet.com/double11/share1.jpg',imgSrc:'http://img.wecarepet.com/double11/RESULTIMG1.png',x:132,y:135,width:94},
  //     {shareSrc:'http://img.wecarepet.com/double11/share2.jpg',imgSrc:'http://img.wecarepet.com/double11/RESULTIMG2.png',x:99,y:103,width:131},
  //     {shareSrc:'http://img.wecarepet.com/double11/share3.jpg',imgSrc:'http://img.wecarepet.com/double11/RESULTIMG3.png',x:213,y:91,width:64},
  //     {shareSrc:'http://img.wecarepet.com/double11/share4.jpg',imgSrc:'http://img.wecarepet.com/double11/RESULTIMG4.png',x:113,y:104,width:81},
  //     {shareSrc:'http://img.wecarepet.com/double11/share5.jpg',imgSrc:'http://img.wecarepet.com/double11/RESULTIMG5.png',x:128,y:150,width:95},
  //     {shareSrc:'http://img.wecarepet.com/double11/share6.jpg',imgSrc:'http://img.wecarepet.com/double11/RESULTIMG6.png',x:119,y:150,width:94},
  //     {shareSrc:'http://img.wecarepet.com/double11/share7.jpg',imgSrc:'http://img.wecarepet.com/double11/RESULTIMG7.png',x:207,y:163,width:118},
  //     {shareSrc:'http://img.wecarepet.com/double11/share8.jpg',imgSrc:'http://img.wecarepet.com/double11/RESULTIMG8.png',x:109,y:191,width:84},
  //     {shareSrc:'http://img.wecarepet.com/double11/share9.jpg',imgSrc:'http://img.wecarepet.com/double11/RESULTIMG9.png',x:177,y:102,width:86},
  //     {shareSrc:'http://img.wecarepet.com/double11/share10.jpg',imgSrc:'http://img.wecarepet.com/double11/RESULTIMG10.png',x:88,y:112,width:87}
  //   ],
  //   middle : [//4
  //     {shareSrc:'http://img.wecarepet.com/double11/share11.jpg',imgSrc:'http://img.wecarepet.com/double11/RESULTIMG11.png',x:188,y:98,width:102},
  //     {shareSrc:'http://img.wecarepet.com/double11/share12.jpg',imgSrc:'http://img.wecarepet.com/double11/RESULTIMG12.png',x:206,y:187,width:84},
  //     {shareSrc:'http://img.wecarepet.com/double11/share13.jpg',imgSrc:'http://img.wecarepet.com/double11/RESULTIMG13.png',x:211,y:152,width:97},
  //     {shareSrc:'http://img.wecarepet.com/double11/share14.jpg',imgSrc:'http://img.wecarepet.com/double11/RESULTIMG14.png',x:150,y:134,width:127}
  //   ],
  //   high : [//4
  //     {shareSrc:'http://img.wecarepet.com/double11/share15.jpg',imgSrc:'http://img.wecarepet.com/double11/RESULTIMG15.png',x:201,y:157,width:77},
  //     {shareSrc:'http://img.wecarepet.com/double11/share16.jpg',imgSrc:'http://img.wecarepet.com/double11/RESULTIMG16.png',x:99,y:129,width:124},
  //     {shareSrc:'http://img.wecarepet.com/double11/share17.jpg',imgSrc:'http://img.wecarepet.com/double11/RESULTIMG17.png',x:204,y:204,width:120},
  //     {shareSrc:'http://img.wecarepet.com/double11/share18.jpg',imgSrc:'http://img.wecarepet.com/double11/RESULTIMG18.png',x:139,y:154,width:90},
  //   ]
  // },

  browser:'ios',
  origin: 'http://wecarepet.com/H5GameH5Game/previousLife/index.html#/'
}

export default new Vuex.Store({
	state,
	actions,//可以处理异步操作
	mutations//只能处理同步操作
})
