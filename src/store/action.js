import Vue from 'vue';
import VueResource from 'vue-resource';

export default {
  initData:function ({dispatch,commit,state},redirect) {
    dispatch('initQues');
    dispatch('checkBrowser');
    var userId = localStorage.getItem('userId_previous_life');
      // 没有用户缓存信息
    //未退出网页
    if(state.userview && state.userview.userId) {
    //  本地有用户缓存id,用户授权过
    }else if(userId){
      dispatch('getUserInfoByUserId', userId).then((rep) => {
        var userview;
        if (rep.body.errCode == 0) {
          userview = rep.body.result;
          commit('UPDATA_USERVIEW', userview);
          dispatch('updataShareInfo');
        } else {
          dispatch('loginWXgetInfo',redirect);
        }
      })
    }else {
      //首次授权登陆
      dispatch('getUrlVars').then(vars => {
        var code = vars['code'], userview;
        if (code) {
          dispatch('getUserInfoByCode', code).then((rep) => {
            if (rep.body.errCode == 0) {
              userview = rep.body.result;
              commit('UPDATA_USERVIEW', userview);
              dispatch('setLocalStorage',{name:'userId_doubleEleven',value:userview.userId});
              dispatch('updataShareInfo');
            } else {
              dispatch('loginWXgetInfo',redirect);
            }
          })
        } else {
          dispatch('loginWXgetInfo',redirect);
        }
      });
    }
  },
    //addNum(context,id) context是和store实例拥有相同属性和方法的上下文 根据es6参数解构—>addNUm({commit},id) context——>{commit}
  remeberAns({ commit, state }, score) {
    //点击下一题，记录答案id，判断是否是最后一题，如果不是则跳转下一题
    commit('REMBER_ANSWER', score);
  },
	addNum({ commit, state }) {
		//题数+1
    commit('ADD_CURRENT_NUM', 1);
	},
  randomAnswer({ commit, state }){
    commit ('RANDOM_ANSWER');
  },
  toggleShowRank({ commit }) {
    commit('TOGGLE_SHOW_RANK');
  },
  toggleShowIntro({ commit }) {
    commit('TOGGLE_SHOW_INTRO');
  },
  saveUserInfo({dispatch,commit,state}){
    var newUserType = {
      id:state.userview.userId,
      // petId:null,
      petType:['cat','dog','other'][state.answers[0]],
      amount:['200','500','1000','2000','2001'][state.answers[1]],
      petname:state.answers[2]
    }
    if(state.userview.numOfCanPlay>0){
      Vue.http.post('saveUserInfo',newUserType).then((rep)=>{
        if(rep.body.errCode==0){
          //答题成功后刷新排行榜
          commit('UPDATA_USERVIEW',rep.body.result);
          dispatch('updataShareInfo');
        }else if(rep.body.errCode==22){
          alert('你家宠物名字含有敏感词哟，没有投票成功~');
        }else if(rep.body.errCode==21){
          alert('每日可投票三次，请明天再来哟~');
        }
        dispatch('getRanking');

      });
    }else{
      alert('每日可投票三次，请明天再来哟~');
      dispatch('getRanking');
    }
  },
  initQues({dispatch,commit,state}){
    commit('INITIALIZE_QUES');
  },

  updataShareInfo({state,dispatch}){
    var userId = state.userview.userId;
    var petType = state.answers[0]?['cat','dog','other'][state.answers[0]]:'cat';
    var shareOrigin;

    // if(userId && petType){
    //   shareOrigin = 'http://wecarepet.com/double11/index.html?#/rank/'+Math.random()*10+'?userId='+userId+"&petType="+petType;
    // }else{
    //   shareOrigin = location.href;
    // }

    shareOrigin = 'http://wecarepet.com/double11/index.html';
    wx.ready(function () {
      var title,desc;
      title = '宠物中谁才是真正的败家之王？参与票选领100元券！';
      desc = '论败家，你家毛球能否上榜？参与必有奖哦~ 拿去买罐头！';
      console.log(state.rankMine)
      console.log(state.rankMine.rankPetName)
      console.log(state.rankMine.rankNum)
      if(state.rankMine && state.rankMine.rankPetName && state.rankMine.rankNum>0 ){
        title = '吐血…我家主子稳居败家排行榜第'+state.rankMine.rankNum+'名！快来为'+state.rankMine.rankPetName+'打call!';
        desc = '论败家，你家毛球能否上榜？参与必有奖哦~ 拿去买罐头！';
      }
      //朋友圈
      wx.onMenuShareTimeline({
        title: title+desc,
        link: shareOrigin,
        imgUrl:'http://img.wecarepet.com/double11/shareImg.png',
        success: function () {
          dispatch('share');
        },
        cancel: function () {
        }
      });
      // 好友
      wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: shareOrigin,
        imgUrl:'http://img.wecarepet.com/double11/shareImg.png',
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          dispatch('share');
        },
        cancel: function () {
        }
      });
    });
  },
  getUrlVars:function ({dispatch,commit,state},silceAgain) {
    return new Promise((resolve, reject) => {
      var vars = [], hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      if(silceAgain){
        var str1 =  window.location.href.slice(window.location.href.indexOf('?') + 1);
        hashes = str1.slice(str1.indexOf('?') + 1).split('&');
      }
      for(var i = 0; i < hashes.length; i++)
      {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
      resolve(vars);
    })
  },
  loginWXgetInfo({commit,state},redirect){
    var targetUrl;
    var APPKEY = "wx22a43bc9a638e4f4";

    var target = 'http://m.wecarepet.com/H5GameH5Game/previousLife/index.html#/';
    var origin = encodeURIComponent('http://wecarepet.net/target?uri='+target);

    if(redirect){
      targetUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+APPKEY+"&redirect_uri="+origin+encodeURIComponent(redirect)+"&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect";
    }
    else{
      targetUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+APPKEY+"&redirect_uri="+origin+"&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect";
    }
    location.href= targetUrl;
  },
  getUserInfoByCode({commit,state},code){
    return new Promise((resolve, reject) => {
      Vue.http.get('login?code='+code).then((rep)=>{resolve(rep)},(err)=>{console.log(err);reject(err)});
    })
  },
  getUserInfoByUserId({commit,state},userId){
    return new Promise((resolve, reject) => {
      Vue.http.get('userInfo?userId='+userId).then((rep)=>{resolve(rep)},(err)=>{console.log(err);reject(err)});
    })
  },
  getCommonPet({commit,state},petType){
      var petType = ['cat','dog','other'][state.answers[0]];
      Vue.http.get('CommonPet?petType='+petType).then((rep)=>{
        commit('INIT_COMMON_PET',rep.body.result);
      },(err)=>{console.log(err)});
  },
  //
  getSearchPet({commit,state},petName){
    var petType = ['cat','dog','other'][state.answers[0]];
    Vue.http.get('searchPet?petName='+encodeURIComponent(petName)+'&petType='+petType+"&state="+1).then((rep)=>{
      if(rep.body.errCode==22){
        alert('你家宠物名字含有敏感词哟，换一个吧~');
      }else if(rep.body.errCode==0){
        commit('UPDATA_SEARCHLIST',rep.body.result);
      }
    },(err)=>{console.log(err)});
  },
  lottery({commit,state,dispatch}){
    Vue.http.get('lottery?userId='+state.userview.userId).then((rep)=>{
      commit('UPDATA_USERVIEW',rep.body.result);
      dispatch('setLocalStorage',{name:state.gameName+'currentUser',value:rep.body.result});

      var codeList = rep.body.result.codeList;
      var lastLottery = codeList[codeList.length-1];
      if(lastLottery.lotteryCode != '谢谢惠顾'){
        alert('恭喜你抽中啦一张'+lastLottery.grade+'券！');
      }else{
        alert('呀呀~券券溜掉了~再试一次吧');
      }
    },(err)=>{console.log(err)});
  },
  share({commit,state,dispatch}){
    if(MtaH5) {
      if(location.href.indexOf('menu')>-1){
        MtaH5.clickStat("19")
      }else if(location.href.indexOf('rank')>-1){
        MtaH5.clickStat("20")
      }else if(location.href.indexOf('lottery')>-1){
        MtaH5.clickStat("21")
      }else{
        MtaH5.clickStat("18")
      }
    }
    if(state.userview.shareState == 1){
      Vue.http.get('share?sharaState='+true+"&userId="+state.userview.userId).then((rep)=>{
        commit('UPDATA_USERVIEW',rep.body.result);
        dispatch('setLocalStorage',{name:state.gameName+'currentUser',value:rep.body.result});
      },(err)=>{console.log(err)});
    }else{
      console.log('以获取过分享增加的抽奖机会');
    }
  },
  //
  getRanking({commit,state,dispatch},num){
    var petType='cat';
    if(num){
      petType = ['cat','dog','other'][num];
    }else if(state.answers[0] != undefined && state.answers[0] != null){
      petType = ['cat','dog','other'][state.answers[0]];
    }
    // console.log('getRanking:------------------num='+num);
    // console.log('getRanking:------------------state.answers[0]='+state.answers[0]);
    // console.log('petType='+petType);
    Vue.http.get('ranking?userId='+state.userview.userId+'&petType='+petType).then(
      (rep)=>{
        commit('UPDATA_RANKINFO',rep.body.result)
        dispatch('updataShareInfo');
      })
  },
  getRankByUrl({dispatch,commit,state},num){
    dispatch('getUrlVars',true).then(vars=>{
      console.log(vars);
      var userId = vars['userId'];
      var petType = vars['petType'];
      var answer0 = petType=='cat'?0:(petType=='dog'?1:2);
      commit('UPDATA_PETTYPE',answer0);
      if(num != undefined && num!=null){
        petType = ['cat','dog','other'][num];
        commit('UPDATA_PETTYPE',num);
      }
      if (userId && petType){
        Vue.http.get('ranking?userId='+userId+'&petType='+petType).then(
          (rep)=>{
            commit('UPDATA_RANKINFO',rep.body.result)
            dispatch('updataShareInfo');
          })
      }else{
        alert('将为你跳转败家主子首页~');
      }
    });

  },
  getLocalStorage:function ({commit,state},user) {
    return new Promise((resolve, reject) => {
      if (localStorage){
        var localUser = localStorage.getItem(user.userName);
        // var localUser = localStorage.getItem(state.gameName+'currentUser');
        if(typeof localUser != "object"){
          localUser = JSON.parse(localUser);
        }
        resolve(localUser);
      }
    })
  },
  setLocalStorage:function ({commit},data) {
    var name = data.name;
    var value = data.value;
    if (localStorage){
      if(value instanceof Object){
        value = JSON.stringify(value);
      }
      localStorage.setItem(name,value);
    }
  },
  checkBrowser({commit}){
    var browser = 'pc';
    if(/android/i.test(navigator.userAgent)){
      console.log("This is Android'browser.");//这是Android平台下浏览器
      browser = 'android';
    }
    if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
      console.log("This is iOS'browser.");//这是iOS平台下浏览器
      browser = 'ios';
    }
    commit('INIT_BROSWER',browser);
  }

}
