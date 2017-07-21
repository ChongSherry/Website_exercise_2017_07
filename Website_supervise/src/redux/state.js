import immutable from 'immutable';

export default immutable.fromJS({
    user:{
        token:""
    },
    view:{
        // 导航折叠
        collapsed: false,
        // 登录状态
        islogin: false
    }
});