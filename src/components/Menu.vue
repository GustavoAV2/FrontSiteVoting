<template>
    <div class="menu">
        <div class="auth-content">
            <div class="auth-modal">
                <div class="options-server">
                    <a class="btn-option-create" @click="changeMenu(0)" :class="selected_create">Criar sala</a>
                    <a class="btn-option-enter"  @click="changeMenu(1)" :class="selected_enter">Entrar</a>
                </div>
                
                <div class="form">
                    <div v-if="!menu">
                        <input v-model="user.name" type="text" maxlength="30" placeholder="Nome">
                        <button class="btn btn-success" @click="createServer()">Criar</button>
                    </div>
                    <div v-else>
                        <input v-model="user.name" type="text" maxlength="30" placeholder="Nome">
                        <input v-model.lazy="user.port" minlength="1" maxlength="6" type="tel" placeholder="Numero da sala">
                        <button class="btn btn-primary" @click="enterServer()">Entrar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="alerts">
            <transition v-if="msg" name="slide" mode="out-in" appear>
                <AlertDanger :msg="msg"/>
            </transition>
        </div>
    </div>
</template>

<script>
import Server from '@/services/server'
import AlertDanger from '@/components/Alert'
import AlerMixin from '@/mixins/alert'

export default {
    name: 'Auth',
    components:{AlertDanger},
    mixins:[AlerMixin],
    name: 'Home',
    
    data(){
        return{
            menu: 0,
            user: {
                'name': '', 
                'port':'', 
                'vote':'', 
                'ready': false,
                'voted_of_numbers': 0,
                'admin': false,
            }
        }
    },
    watch:{
        ['user.name'](){
            this.user.name = this.user.name.slice(0, 30)
        },
        ['user.port'](){
            if (this.user.port){
                this.user.port = this.user.port.slice(0, 6)
            }
        }
    },
    methods:{
        createServer(){
            this.user.admin = true
            Server.create_server(this.user).then(response => {
                this.setItems(this.user, response.data)
                this.$router.push('/votingroom')
            }).
            catch(() => {
                this.user.admin = false
                this.generateMsg('Erro ao criar sala, verifique o campo!', 'danger')
            })
        },
        
        enterServer(){
            Server.connect_server(this.user).then(response => {
                this.setItems(this.user, response.data)
                this.$router.push('/votingroom')
            }).
            catch(() => {
                this.generateMsg('Sala não existe!', 'danger')
            })
        },
        
        setItems(user, server){
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('server', JSON.stringify(server))
        },
        changeMenu(num_menu){
            this.menu = num_menu
            this.user.port = null
        }
    },
    computed:{
        selected_enter(){
            if(this.menu){
                return 'selected'
            }
        },
        selected_create(){
            if(!this.menu){
                return 'selected'
            }
        }
    }
}
</script>

<style scoped>
    .menu{
        margin-top: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .options-server{
        display: flex;
        justify-content: space-around;
    }
    .btn-option-create{
        width: 50%;
        padding: 5px;
        border-radius: 10px 0px 0px 0px;
    }
    .btn-option-create:hover{
        transition: 0.5s;
        background-color: rgba(0, 0, 0, 0.10);
    }
    .btn-option-enter{
        width: 50%;
        padding: 5px;
        border-radius: 0px 10px 0px 0px;
    }
    .btn-option-enter:hover{
        transition: 0.5s;
        background-color: rgba(0, 0, 0, 0.10);
    }
    .selected{
        border: rgba(0, 0, 0, 0.15) 1px solid;
        border-bottom: none;
    }
    .auth-modal {
        background-color: #FFF;
        width: 350px;
        border-radius: 10px 10px 0px 0px;
        padding: 0px 0px 15px 0px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }
    .form{
        padding: 35px;
    }
    .auth-title {
        font-size: 1.2rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }
    .auth-modal input {
        border: 1px solid #BBB;
        width: 100%;
        margin-top: 15px;
        padding: 3px 8px;
        outline: none;
    }
    .auth-modal button {
        align-self: flex-end;
        color: #FFF;
        margin-top: 15px;
        padding: 5px 15px;
    }
    .auth-modal a {
        margin-top: 35px;
        cursor: pointer;
    }
    .options-server a {
        margin-top: 0px;
        text-decoration: none;
    } 
    .btn-option{
        cursor: pointer;
        text-decoration: none;
    }
    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, 0.75),
            rgba(120, 120, 120, 0));
    }
    .alert{
        width: 350px;
    }
    input{
        text-align: center;
    }
    
    /* Animated */
    @keyframes slide-in{
        from { transform:  translateY(40px);}
        to { transform:  translateY(0);}
    }
    @keyframes slide-out{
        from { transform:  translateY(0);}
        to { transform:  translateY(40px);}
    }
    .slide-enter-active{
        animation: slide-in 2s ease;
        transition: opacity 2s;
    }
    .slide-leave-active{
        animation: slide-out 2s ease;
        transition: opacity 2s;
    }
    .slide-enter, .slide-leave-to {
        opacity: 0;
    }
</style>
