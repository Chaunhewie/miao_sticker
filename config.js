var bizlogic = {
  // 是否是本地
  isLocal: false,
  // 是否是正式
  isFormal: false, // isLocal:false 时才有效

  // 本地测试地址 
  localTest: 'http://192.168.0.123:14488/',
  // 本地登录测试地址 
  localTest_login: 'http://192.168.0.123:14488/login/',

  // 测试服务器地址 
  serverTest: 'http://miaosticker.cn:14488/',  // 14155
  // 测试服务器登录地址 
  serverTest_login: 'http://miaosticker.cn:14488/login/',

  // 正式服务器接口地址
  serverFormal: 'http://miaosticker.cn:14488/',
  // 正式服务器登录接口
  serverFormal_login: 'http://miaosticker.cn:14488/login/',
};

var serverUrl = '', loginUrl = '';

// 判断是否是本地
if (bizlogic.isLocal == true) {
  serverUrl = bizlogic.localTest;
  loginUrl = bizlogic.localTest_login;
} else {
  serverUrl = bizlogic.isFormal ? bizlogic.serverFormal : bizlogic.serverTest;
  loginUrl = bizlogic.isFormal ? bizlogic.serverFormal_login : bizlogic.serverTest_login;
};

module.exports = {
  serverUrl: serverUrl,
  loginUrl: loginUrl
};
