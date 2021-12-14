<template>
    <div class="jsonFormat">{{result}}</div>
</template>
<script>
export default {
    name: "jsonFormat",
    data(){
        return{
            contract_address:this.$route.params.address,
            format:this.$route.params.format,
            formatz:'',
            result:""
        }
    },
    created(){
        this.getDate()
    },
    methods:{
        getDate(){
            this.$axios
                .get("/api/contract/exportAbi",{params:{contract_address:this.$route.params.address, format: this.format}})
                .then((res) => {
                    this.result = res.data
                    console.log(res);
                })
                .catch((err) => {
                console.log(err);
                });
        }

    }

}
</script>
<style scoped>
    .jsonFormat{
        padding: 20px 20px 100px;
    }

</style>