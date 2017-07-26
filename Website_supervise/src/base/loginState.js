export default {
    set:(tokenstr)=>{
        window.localStorage.setItem("token",tokenstr);
    },
    get:()=>{
        return localStorage.getItem("token");
    },
    clear:()=>{
        localStorage.removeItem("token");
    }
}