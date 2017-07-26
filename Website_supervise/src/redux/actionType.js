// 动作
export default {
    creat:(type,data)=>{
        return {"type":type,"data":data};
    },
    COLLAPSED_VIEW_SIDER:Symbol("COLLAPSED_VIEW_SIDER"),
    SET_LOGIN_STATE:Symbol("SET_LOGIN_STATE"),
    LOADING:Symbol("LOADING"),
}