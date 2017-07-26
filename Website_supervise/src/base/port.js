export default {
    server: "http://127.0.0.1:3998",
    base: {
        doLogin: "/manage/login/doLogin",
    },
    content: {
        class: {
            selectContent_class: "/manage/post_content_class/selectContentClass",
            removeContent_class: "/manage/post_content_class/removeContentClass",
            addContent_class: "/manage/post_content_class/addContentClass",
            updateContent_class: "/manage/post_content_class/updateContentClass"
        },
        info:{
            addContent:"/manage/post_content/addContent",
            selectContentList:"/manage/post_content/selectContentList",
            sortContentList:"/manage/post_content/sortContentList",
            removeContent:"/manage/post_content/removeContent",
            isSelectContent:"/manage/post_content/idSelectContent",
            updateContent:"/manage/post_content/updateContent"
        }
    }
}