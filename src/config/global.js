import Vue from 'vue'

export function showError(msg){
    Vue.toasted.global.defaultError({msg})
}
export function showSuccess(msg){
    Vue.toasted.global.defaultSuccess({msg})
}


export default { showError, showSuccess }
