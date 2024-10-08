
type PageInfo = {
    title: string,
    subtitle?: string,
    path: Array<{ name: string, path?: string }>
}

export const pageInfoMapper: Record<string, PageInfo> = {
    '/': {
        title: "Home",
        path: [
            { name: "Home" }
        ]
    },
    '/user/login': {
        title: "Login",
        path: [
            { name: "Home" },
            { name: "User" },
            { name: "Login" }
        ]
    },
    '/user/logout': {
        title: "Logout",
        path: [
            { name: "Home" },
            { name: "User" },
            { name: "Logout" }
        ]
    },
    '/treehole/tag': {
        title: "Tag Management",
        path: [
            { name: "Home" },
            { name: "Treehole" },
            { name: "Tag" }
        ]
    },
    '/treehole/message': {
        title: "发送站内信",
        path: [
            { name: "Home" },
            { name: "Treehole" },
            { name: "Message" }
        ]
    },
    '/decrypt/history': {
        title: "我的解密历史",
        path: [
            { name: "Home" },
            { name: "Decrypt" },
            { name: "History" }
        ]
    },
    '/decrypt/status': {
        title: "查询解密状态",
        path: [
            { name: "Home" },
            { name: "Decrypt" },
            { name: "Status" }
        ]
    },
    '/decrypt/upload': {
        title: "解密用户数据",
        path: [
            { name: "Home" },
            { name: "Decrypt" },
            { name: "Upload" }
        ]
    }
}