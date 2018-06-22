<template>
    <div class="content_box">
        <Breadcrumb class="brands">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem to="/logistic">物流列表</BreadcrumbItem>
            <Button class="searchBtn" type="primary"  @click="addLogistic"><Icon type="plus-round"></Icon> 添 加</Button>
        </Breadcrumb>
        <Table class="tableStyle" :columns="columns" :data="data"></Table>
        <Page class="pageInfo"
			@on-change="pageShow"
			:total="total" 
			:page-size="pageSize" 
			:current='currentPage' 
			show-elevator 
		></Page>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'list',
    data () {
        return { 
            columns: [
                {
                    title: 'id',
                    key: 'id'
                },
                {
                    title: '出发地',
                    key: 'departure'
                },
                {
                    title: '目的地',
                    key: 'focus'
                },
                {
                    title: '吨数',
                    key: 'tunnage'
                },
                {
                    title: '单价',
                    key: 'unitPrice'
                },
                {
                    title: '手机号',
                    key: 'mobile'
                },
                {
                    title: '备注',
                    key: 'remark'
                },
                {
                    title : '操作',
                    width: 200,
                    align: 'center',
                    key : "mark",
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                style: {
                                    backgroundColor: "#2d8cf0",
                                    textAlign:"center",
                                    color:"#eee",
                                },
                                on : {
                                    click : ()=> {
                                        window.location.href = '/#/logisticDetail?id=' + params.row.id
                                    }
                                }
                            }, '编辑')
                        ]);
                    }
                }
            ],
            data: [],
            total: 1,
            currentPage: 1,
            pageSize: 10
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
	  	getList () {
            let pageNo = parseInt(this.currentPage) - 1;
            axios.get(`/api/logistic?pageNo=${pageNo}&pageSize=${this.pageSize}`).then(d => {
                const data = d.data.data.logistics
                this.data = data.rows
                this.total = data.count
            })
        },
        pageShow(d){
                this.currentPage = d;
                this.getList();
        },
        datatime(time){
            var date = new Date(time * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            var H = date.getHours() < 10 ? "0" + date.getHours() : date.getHours() + ':';
            var Mi = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes() + ':';
            var S = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            return Y+M+D+H+Mi+S;
        },
        addLogistic() {
            window.location.href = '#/logisticDetail';
        }
    }
}
</script>

<style scoped>
    .crumbs{
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
        border-radius: 5px;
    }
    .tableStyle {
        margin-bottom: 20px;
    }
    .pageInfo {
        text-align: center;
        margin-bottom: 20px;
    }
    .brands {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        /* padding-left: 20px; */
        margin-bottom: 20px;
    }
    .searchBtn{
        float: right;
        margin-right: 10px;
        margin-top: 7px;
    }
</style>