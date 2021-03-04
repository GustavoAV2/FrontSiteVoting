export default {
    data(){
        return{
            msg: null,
            status: 'success',
        }
    },

    methods:{
        generateMsg(msg, status){
            if (!this.msg){
                this.status = status
                this.msg = msg
                setTimeout(() =>{
                    this.msg = null
                }, 2000)
            }
        },
    }
}