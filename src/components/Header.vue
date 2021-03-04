<template>
    <header class="header">
        <template v-if="port">
            <div class="flex">
                <h1 class="server">Sala <input ref="copy" :value="port" disabled id="number-server">
                    <template v-if="!copy" @click="copyClipboard()">
                        <svg @click="copyClipboard()" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-clipboard copy" viewBox="0 0 16 16">
                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                        </svg> 
                    </template>

                    <template v-else>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                        </svg>
                        <label class="check">Copied!</label>
                    </template>
                </h1>
                <a @click="back()" class="back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-left logout" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                        <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                    </svg>
                </a>
            </div>
        </template>

        <template v-else>
            <div class="flex-tittle">
                <h1 class="title">
                    <a>{{ title }}</a>
                </h1>
            </div>
        </template>
    </header>
</template>

<script>
export default {
    name: 'Header',
    data(){
        return{
            title: 'Planning Poker',
            copy: false
        }
    },
    methods:{
        copyClipboard(){
            this.copy = true
            const texto = this.port;

            let inputTest = document.createElement("input");
            inputTest.value = texto;

            document.body.appendChild(inputTest);
            inputTest.select();
            document.execCommand('copy');

            document.body.removeChild(inputTest);

            setTimeout(()=>{
                this.copy = !this.copy
            }, 2500)
            
        },
        back(){
            localStorage.clear()
            this.$router.push('/')
        },
    },
    computed:{
        port(){
            if (localStorage.getItem('server')){
                const server = JSON.parse(localStorage.getItem('server'))
                return server.port
            }
        }
    }
}
</script>

<style scoped>
    .header {
        background: linear-gradient(to right, #1e469a, #49a7c1);
    }
    .flex-tittle{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .flex{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .title {
        font-weight: 1;
        margin-top: 10px;
        font-size: 1.5rem;
        color: #fff;
        text-align: center;
        text-shadow: 0 0 10px rgb(255 255 255 / 70%);
    }
    .server{
        margin-left: 5px;
        color: #fff;
        font-size: 1.5rem;
        text-shadow: 0 0 10px rgb(255 255 255 / 70%);
    }
    #number-server{
        width: 90px;
        margin-top: 10px;
        border: none;
        background: none;
        color: #fff;
        font-size: 1.5rem;
        font-weight: 1;
        text-shadow: 0 0 10px rgb(255 255 255 / 70%);
    }
    header.header > a.toggle {
        width: 60px;
        height: 100%;
        color: #fff;
        justify-self: flex-start;
        text-decoration: none;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    header.header > a.toggle:hover {
        color: #fff;
        background-color: rgba(0, 0, 0, 0.2);
    }
    .back{
        cursor: pointer;
        margin-top: 10px;
        margin-right: 5px;
        color: red;
    }
    .bi{
        cursor: pointer;
    }
    .bi-check2{
        color: green;
    }
    .check{
        color: green;
        font-size: 10px;
        text-shadow: none;
        text-shadow: 0 0 10px rgb(000 000 000 / 70%);
    }

    /* Animação */
    .logout:hover{
        transition: 0.5s;
        height: 25px;
        width: 25px;
    }
    .copy:hover{
        transition: 1s;
        height: 22px;
        width: 22px;
    }
</style>
