<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='199'>
        <button class="mui-btn mui-btn-numbox-minus" type="button" 
        @click.stop="subtract" :disabled="subDis">-</button>
        <input id="test" readonly class="mui-input-numbox" type="number" 
        :value="currentCount"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button" 
        @click.stop="add" :disabled="addDis">+</button>
    </div>
    <!-- 分析：如何实现 -->
</template>
<script>
//mui中使用了非严格模式才有的一些语法，而webpack默认是执行严格模式的
//所以会报错，不过我们可以自己写业务逻辑
export default {
    data(){
        return {
            subDis: true,
            addDis: false,
            currentCount: 1  
            // 在做购物车的时候，需要设定数量，所以该属性需要能被父组件配置
        }
    },
    props: [
        "min","max","initCount", "goodsId", "isChangeStore"
        // isChangeCart 属性，是用来判断，当数量改变时，是否更新仓储
    ],
    created(){        
        this.currentCount = this.initCount; 
        this.setDisable();          
    },
    methods: {
        setDisable: function(){            
            if(this.currentCount >= this.max){
                this.subDis = false;
                this.addDis = true;
            }else{
                if(this.currentCount <= this.min){
                    this.subDis = true;
                    this.addDis = false;
                }else{
                    this.subDis = false;
                    this.addDis = false;
                }
            }
        },
        add: function(){
            if(this.currentCount < this.max){
                this.currentCount++;
            }
            this.setDisable(); 
        },
        subtract: function(){
            if(this.currentCount > this.min){
                this.currentCount--;                
            }
            this.setDisable();
        },
        // 在购物车组件中，点击加减按钮时，同步购物车仓促数据
        // 需要让 goodsInfo.vue 组件调用numberBox的时候，
        // 传递过来 修改仓储的方法 
        // 之所以不在 watch中做这个事情，是因为
        // changeCartCount: function(){
        //     var goodsInfo = {id: this.goodsId, count: this.currentCount};
        //     this.$emit('updateCart', goodsInfo);
        // }
    },
    // 由于input元素的onchange事件触发机制问题(必须先获取到焦点,然后改变,然后失去焦点)
    // 所以这里不能在input的change事件中调用父组件传递过来的getcount()方法。
    // 我们的办法是：通过监听input标签绑定的currentNum的值，来触发getcount（）
    watch: {
        'currentCount' : function(newValue, oldValue){
            this.$emit("getcount", parseInt(newValue));
            // 当数据更新的时候，试图去修改购物车中的商品购买数量
            // 这里不能直接更新，否则在goodsInfo.vue页面上更改数量时会有bug
            if(this.isChangeStore){
                var goodsInfo = {id: this.goodsId, count: this.currentCount};
                this.$store.commit('updateStore', goodsInfo);
            }
        }
    }
}
</script>
<style lang="less">

</style>
