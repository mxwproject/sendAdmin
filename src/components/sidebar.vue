<template>
    <Menu :active-name="activeName" theme="dark" width="auto" :accordion="true" :v-model="lists">
        <div class="layout-logo-left">后台</div>  
        <Submenu v-for="(list ,index) in lists" :name="list.name" :key="index">
            <template class="nav_1" slot="title">
                <Icon :type="list.icon"></Icon>
                <span class="layout-text">{{list.title}}</span>
            </template>
            <router-link v-for="(item ,i) in list.pathTo" :to=item.path  :key="item.text">
                <MenuItem :name="item.name">
                    <span class="layout-text">{{item.text}}</span>
                </MenuItem>
            </router-link>
        </Submenu>
    </Menu>
</template>
<script>
export default {
    props: ['collapsed'],
    data(){
        return {
            lists : [
                {   
                    name: "1",
                    icon : "document-text",
                    title : "物流管理",
                    pathTo : [
                        {
                            path : "/logistic",
                            text : "物流列表",
                            name : "2-1"
                        }
                    ]
                },
                // {   
                //     name: "2",
                //     icon : "document-text",
                //     title : "物流管理",
                //     pathTo : [
                //         {
                //             path : "/logistic",
                //             text : "物流列表",
                //             name : "2-1"
                //         }
                //     ]
                // }
            ],
            activeName : "",
            isCollapsed :false
        }
    },
    watch :{
        collapsed : function(){
            this.$refs.side1.toggleCollapse();
        }
    },
    computed : {
        menuitemClasses () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        }
    }
}
</script>
<style scoped>
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        font-size: 20px;
        color: #9ba7b5;
        line-height: 30px;
        text-align: center;
        border-radius: 3px;
        margin: 15px auto;
        overflow: hidden;
    }

    .layout-hide-text .layout-logo-left {
        font-size: 12px;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
</style>
