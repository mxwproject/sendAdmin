<template>
    <div>
        <Breadcrumb class="brands">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem to="/article">新增物流</BreadcrumbItem>
        </Breadcrumb>
        <Form ref="formValidate" :model="formValidate" :label-width="120" class="fromStyle">
            <FormItem label="出发地：" prop="departure">
                <Input v-model="formValidate.departure" placeholder="请填写出发地" class="optionStyle"></Input>
            </FormItem>
            <FormItem label="目的地：" prop="focus">
                <Input v-model="formValidate.focus" placeholder="请填写目的地" class="optionStyle"></Input>
            </FormItem>
            <FormItem label="吨数：" prop="tunnage">
                <Input v-model="formValidate.tunnage" placeholder="请填写吨数" class="optionStyle"></Input>
            </FormItem>
            <FormItem label="单价：" prop="unitPrice">
                <Input v-model="formValidate.unitPrice" placeholder="请填写单价" class="optionStyle"></Input>
            </FormItem>
            <FormItem label="手机号：" prop="mobile">
                <Input v-model="formValidate.mobile" placeholder="请填写手机号" class="optionStyle"></Input>
            </FormItem>
            <FormItem label="备注：" prop="remark">
                <Input v-model="formValidate.remark" placeholder="请填写备注" class="optionStyle"></Input>
            </FormItem>
            <FormItem  label="显示状态：">
                <i-Switch v-model="swathStatus" @on-change="statusChange"></i-Switch>
            </FormItem>
            <FormItem>
                <Button class='sure' type="primary" :disabled="buttonDisabled" @click="handleSubmit('formValidate')">确定</Button>
            </FormItem>
        </Form>
    </div>    
</template>

<script>
import axios from 'axios'
export default {
    name: 'beginning',
    data () {
        return {
            formValidate: {
                departure: '',
                focus: '',
                tunnage: '',
                unitPrice: '',
                mobile: '18840770966',
                remark: '',
                status: 2
            },
            swathStatus: false,
            buttonDisabled: false,
        }
    },
    mounted() {
        var _url =  window.location.href;

        if (_url.indexOf('id=') != -1) {
            this._id = parseInt(_url.split("id=")[1]);
        }

        axios.get('/api/logistic/' + this._id).then((d) => {
            const data = d.data.data;
            if (Object.keys(data).length) {
                this.formValidate.departure = data.departure;
                this.formValidate.focus = data.focus;
                this.formValidate.tunnage = data.tunnage;
                this.formValidate.unitPrice = data.unitPrice;
                this.formValidate.mobile = data.mobile;
                this.formValidate.remark = data.remark;
                this.swathStatus = (data.status == 1 ? true : false);
            }
        });
    },
  	methods: {
        statusChange(status) {
            this.formValidate.status = status ? 1 : 2;
        },
	  	handleSubmit (name) {
            this.buttonDisabled = true;
            const data = this.formValidate
            data.status = this.swathStatus ? 1 : 2
            data.content = this.content
            if(this._id){
                axios.put('/api/logistic/' + this._id,data).then((d)=>{
                    if(d.data.code == 1) {
                        this.$Message.info({
                            content: '修改成功',
                            duration: 1
                        })
                        setTimeout(() => {
                             window.location.href="/#/logistic"
                        }, 1000)
                    }else {
                        this.$Message.error({
                            content: d.data.msg,
                            duration: 1
                        })
                    }
                });
            }else {
                axios.post('/api/logistic', data ).then((d)=>{
                    if (d.data.code == 1 ){
                        this.$Message.info({
                            content: '添加成功',
                            duration: 1
                        });
                        setTimeout(() => {
                            window.location.href="/#/logistic"
                        }, 1000);
                    }else {
                        this.$Message.error({
                            content: d.data.msg,
                            duration: 1
                        })
                    }
                })
            }
        },
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

    .fromStyle {
        padding: 20px;
    }

    .optionStyle {
        width: 240px;
    }

    .brands {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        /* padding-left: 20px; */
        margin-bottom: 20px;
    }
    .sure {
        margin-top: 5rem;
    }
</style>