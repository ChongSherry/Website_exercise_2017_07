export default {
    server: "http://localhost:3998",
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
            updateContent:"/manage/post_content/updateContent",
            updateBool:"/manage/post_content/updateBool",
            upload:"/manage/post_content/upload"
        }
    },
    config:{
        upload:"/manage/website_config/logoUpload",
        getList:"/manage/website_config/getConfig",
        create:"/manage/website_config/createConfig"
    },
    channel:{
        order:"/manage/channel/order",
        remove:"/manage/channel/remove",
        list:"/manage/channel/list",
        create:"/manage/channel/create",
        update:"/manage/channel/update",
        showBool:"/manage/channel/showBool"
    },
    Singlepage:{
        list:"/manage/Singlepage/list",
        remove:"/manage/Singlepage/remove",
        create:"/manage/Singlepage/create",
        update:"/manage/Singlepage/update"
    }
}