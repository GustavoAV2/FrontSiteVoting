<template>
  <div class="planning">
    <Header/>
    <div class="players">
        <div class="menu">
            <h1 class="info">Numero de participantes: {{server.users.length}}</h1>
            <span v-if="numUsersReady.not_ready" style="color:red">Em preparação: {{numUsersReady.not_ready}}</span>
            <span v-else style="color:green">Todos estão prontos!</span>
        </div>

        <div class="game">
            <transition name="transfer" mode="out-in" appear>
                <div v-if="winner">
                    <h3>Vencedor: {{winner}}</h3>
                    <hr>
                </div>
                <div v-if="server.started">
                    <h3>Votou em: <strong v-if="user_now.vote">{{user_now.vote}}</strong></h3>
                    <hr>
                </div>
            </transition>

            <ul class="list-group">
                <li v-for="user in server.users" :key="user.name" @click="voted(user)" :class="classUser(user)">
                    <label v-if="user.ready" class="ready">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                        </svg>
                    </label>
                    <label v-else class="notReady">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                        </svg>
                    </label>
                    <label class="name">{{user.name}} </label>
                    <label v-if="!server.started" class="votes">Votos:<strong>{{user.number_of_votes}}</strong></label>
                    <label v-else :class="ifVotedClass(user)">Votou</label>
                </li>
            </ul>
            <br>

            <div class="buttons">
                <div v-if="user_now.admin">
                    <button v-if="server.started" @click="finish_votes(server.port)" :disabled="blockedStarted" class="btn btn-danger">
                        Finalizar
                    </button>
                    <button v-else @click="started_votes(server.port)" :disabled="blockedStarted" class="btn btn-warning">
                        Iniciar
                    </button>
                </div>
                <template v-if="!server.started">
                    <template v-if="!user_now.ready">
                        <button @click="readyChange()" class="btn btn-success">Pronto!</button>
                    </template>
                    
                    <template v-else>
                        <button @click="readyChange()" class="btn btn-danger">Não estou pronto!</button>
                    </template>
                </template>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {showError, showSuccess} from '@/config/global'
import Server from '@/services/server'
import Header from '@/components/Header'

export default {
    components:{Header},
    data() {
        return {
            time: 15,
            user_now: null,
            server: null,
            winner: null,
            copy: false,
            request: setInterval(()=>{
                Server.get_server(this.server.port).then(response => {
                    this.server = response.data
                    const user = this.server.users.filter((value)=>{return value.name == this.user_now.name ? true : false})[0]
                    this.user_now = user
                })     
            }, 2000)
        } 
    },

    methods: {
        classUser(user){
            return user.name != this.user_now.name ? "list-group-item" : "list-group-item disabled"
        },
        ifVotedClass(user){
            return user.vote ? "ready" : "notReady"
        },
        voted(user){
            if (this.server.started){
                Server.voted({'port': this.server.port, 'name': this.user_now.name, 'vote': user.name}).
                then(response => {
                    const server = response.data
                    this.user_now.vote = user.name
                    this.server = server
                    this.showError
                    showSuccess(`Voted on ${user.name}!`)
                })
            }
        },
        readyChange(){
            Server.ready(this.server.port, this.user_now.name).then(response => {
                this.server = response.data
                this.user_now.ready = !this.user_now.ready
                if (this.user_now.ready){
                    showSuccess('Você está preparado!')
                }
                else{
                    showError('Você não está preparado!')
                }
            })
        },
        started_votes(port){
            this.winner = null
            Server.started(port).then(response => {
                const server = response.data
                this.server = server
            }).
            catch(() => {
                showError('Algum jogador ainda não está preparado!')
            })
        },
        finish_votes(port){
            Server.finish(port).then(response => {
                this.user_now.vote = null
                this.server = response.data
            })
        },
        generateWinner(){
            var last_best_score = 0
            var winner = null 
            const users = this.server.users
            for (var index in users){
                if (users[index].number_of_votes == last_best_score){winner = null}
                if (users[index].number_of_votes > last_best_score){
                    winner = users[index].name; 
                    last_best_score = users[index].number_of_votes
                }
            }
            this.winner = winner
        }
    },

    watch:{
        copy(){
            setTimeout(() => {
                this.copy = false
            }, 4500)
        },
        ['server.started'](){
            this.server.started ? showSuccess('Votação iniciada!') : showError('Votação finalizada!')
            this.generateWinner()
        }
    },

    computed:{
        numUsersReady(){
            const ready = this.server.users.filter((value)=>{return value.ready})
            const not_ready = this.server.users.filter((value)=>{return value.ready ? false : true})
            return {'ready': ready.length, 'not_ready': not_ready.length}
        },

        blockedStarted(){
            return this.numUsersReady['ready'] == this.server.users.length ? false : true
        },
    },

    // updated(){
    //     localStorage.setItem('server', JSON.stringify(this.server))
    //     localStorage.setItem('user', JSON.stringify(this.user_now))
    // },

    created(){
        this.server = JSON.parse(localStorage.getItem('server'))
        this.user_now = JSON.parse(localStorage.getItem('user'))
    },

    beforeDestroy(){
        clearInterval(this.request)
        Server.disconnect_server({'port': this.server.port, 'name': this.user_now.name})
    }
};
</script>

<style scoped>
.players {
    height: 100%;
    margin-top: 20px;
    border-radius: 5px;
    margin-left: 150px;
    margin-right: 150px;
    min-width: 800px;
    padding-bottom: 50px;
    background-color: #FFF;
    box-shadow: 0 1px 5px rgb(0 0 0 / 15%);
}
.menu{
    color: #333;
    display: flex;
    margin-top: 10px;
    border-radius: 5px 5px 0px 0px;
    align-items: center;
    background-color: #DDD;
    justify-content: space-around;
}
.game{
    padding-top: 20px;
    padding-right: 200px;
    padding-left: 200px;
}
.list-group-item{
    cursor: pointer;
    border-color: black;
    display: flex;
    justify-content: space-between;
}
.buttons{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.row{
    width: 100%;
}
.status{
    display: flex;
    justify-content: space-around;
    font-size: 15px;
}
.info{
    font-size: 20px;
    color: black;
}
.col{
    margin-top: 10px;
}
.btn-warning{
    padding-right: 20px;
    padding-left: 20px;
}
.cbc{
    height: 100%;
    background: -webkit-linear-gradient(top,#007cbc 0,#004f96 90%);
}
.alert{
    margin-top: 10px;
    width: 200px;
}
.votes{
    font-size: 25px;
}
.name{
    font-size: 25px;
}
.id{
    font-size: 25px;
}
.notReady{
    color: red;
    font-size: 25px;
}
.ready{
    color: green;
    font-size: 25px;
}
/* Animação */
@keyframes slide-in{
  from { transform:  translateY(40px);}
  to { transform:  translateY(0);}
}
@keyframes slide-out{
  from { transform:  translateY(0);}
  to { transform:  translateY(40px);}
}
.slide-enter-active{
  animation: slide-in 1s ease;
  transition: opacity 1s;
}
.slide-leave-active{
  animation: slide-out 1s ease;
  transition: opacity 1s;
}
.slide-enter, .slide-leave-to {
  opacity: 0;
}
@keyframes transfer-in{
  from { transform:  translateY(40px);}
  to { transform:  translateY(0);}
}
@keyframes transfer-out{
  from { transform:  translateY(0px);}
  to { transform:  translateY(0px);}
}
.transfer-enter-active{
  animation: transfer-in 1s ease;
  transition: opacity 1s;
}
.transfer-enter, .transfer-leave-to {
  opacity: 0;
}
label:hover{
    cursor: pointer;
}
.list-group-item:hover{
    /* background-color: #17A2B8; */
    background-color: rgba(72, 166, 255, 0.10);
}

</style>