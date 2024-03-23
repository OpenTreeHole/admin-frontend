import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
    state: () => ({
        // path: [
        //     { name: 'Home', path: '/' },
        //     { name: 'user', path: '/user' },
        //     { name: 'admin' }
        // ],
        // title: "Title114514",
        // subtitle: "SubTitle666"
        path: [],
        title: "",
        subtitle: ""
    })
})
