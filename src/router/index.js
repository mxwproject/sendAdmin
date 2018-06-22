import Vue from "vue";
import Router from "vue-router";
import Index from "@/view/index";
import Login from "@/view/login";
import Logistic from "@/view/logistic";
import LogisticDetail from "@/view/logisticDetail";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "首页",
            component: Index,
            redirect: 'logistic',
            children: [
                {
                    path: "/logistic",
                    name: "物流列表",
                    component: Logistic
                }
            ]
        },
        {
            path: "/",
            name: "物流发布",
            component: Index,
            redirect: 'logisticDetail',
            children: [
                 {
                    path: "/logisticDetail",
                    name: "新增文章",
                    component: LogisticDetail
                }
            ]
        }, 
        {
            path : '/login',
            name : '登录页',
            component : Login
        }
    ]
});
