import VerifyCode from "./src/main";

VerifyCode.insatll = function(Vue) {
  Vue.compontent(VerifyCode.name, VerifyCode);
};

export default VerifyCode;
