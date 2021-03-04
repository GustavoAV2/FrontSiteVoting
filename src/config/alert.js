import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    iconPack: 'fontawesome',
    duration: 2000
})

Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Sucess0!' : payload.msg,
    {type: 'success', icon: 'check'}
)

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Erro!' : payload.msg,
    {type: 'error', icon: 'times'}
)