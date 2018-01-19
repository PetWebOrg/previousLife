const REMBER_ANSWER = 'REMBER_ANSWER'
const ADD_CURRENT_NUM = 'ADD_CURRENT_NUM'
const TOGGLE_SHOW_RANK = 'TOGGLE_SHOW_RANK'
const TOGGLE_SHOW_INTRO = 'TOGGLE_SHOW_INTRO'

const UPDATA_USERVIEW = 'UPDATA_USERVIEW'
const INITIALIZE_QUES = 'INITIALIZE_QUES'
const INIT_BROSWER = 'INIT_BROSWER'
const INIT_COMMON_PET = 'INIT_COMMON_PET'
const UPDATA_RANKINFO = 'UPDATA_RANKINFO'

const UPDATA_SEARCHLIST = 'UPDATA_SEARCHLIST'
const UPDATA_LOTTERY = 'UPDATA_LOTTERY'
const UPDATA_SHARE = 'UPDATA_SHARE'
const UPDATA_PETTYPE = 'UPDATA_PETTYPE'
const RANDOM_ANSWER = 'RANDOM_ANSWER'

export default {
  //初始化用户信息
  [UPDATA_USERVIEW](state,userview) {
    state.userview = userview;
  },
	// 初始化答题信息
	[INITIALIZE_QUES](state,userView,browser) {
	  state.userview.currentQusNum = 0;
	  state.userview.score = 0;
	},
  //点击进入下一题
  [ADD_CURRENT_NUM](state, num) {
    state.userview.currentQusNum += num;
  },
  //计算总分
  [REMBER_ANSWER](state, score) {
    state.userview.score += score;
  },
  //随机答案
  [RANDOM_ANSWER](state) {
    /**
     * JS获取n至m随机整数
     * 琼台博客
     */
    function rd(n,m){
      var c = m-n+1;
      return Math.floor(Math.random() * c + n);
    }
    state.level.mylevel = state.userview.score <= state.level.low ? 'low' : state.userview.score <= state.level.middle ? 'middle' : 'high';
    console.log('总分=');
    console.log(state.userview.score);
    console.log(state.level.mylevel);
    if( state.level.mylevel === 'low'){
      state.result.beforeDrawAvatar = state.RESULTIMG.low[rd(0,10)];
    }else if(state.level.mylevel === 'middle'){
      state.result.beforeDrawAvatar = state.RESULTIMG.middle[rd(0,3)];
    }else if(state.level.mylevel === 'high'){
      state.result.beforeDrawAvatar = state.RESULTIMG.high[rd(0,3)];
    }
    console.log('第几张图');
    console.log(state.result.beforeDrawAvatar.imgSrc);
  },




  [TOGGLE_SHOW_RANK](state) {
    state.showRank = !state.showRank;
  },
  [TOGGLE_SHOW_INTRO](state) {
    state.showIntroducation = !state.showIntroducation;
  },

  [INIT_BROSWER](state,broswer) {
    state.browser = broswer;
  },
  [INIT_COMMON_PET](state,commonPetList) {
    state.commonPetList = commonPetList;
  },
  [UPDATA_SEARCHLIST](state,searchList) {
    state.searchList = searchList;
  },
  [UPDATA_PETTYPE](state,num) {
    state.answers[0] = num;
  }

}
