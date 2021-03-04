import { http } from './config'

export default {
    create_server(server){
        return http.post('create-server', server)
    },
    connect_server(server){
        return http.post('connect-server', server)
    },
    disconnect_server(server){
        return http.post('disconnect-server', server)
    },
    get_server(port){
        return http.get(`get-server/${port}`)
    },
    ready(port, name){
        return http.post(`ready/${port}/${name}`)
    },
    started(port){
        return http.post(`started-server/${port}`)
    },
    finish(port){
        return http.post(`finish-server/${port}`)
    },
    voted(user){
        return http.post('vote-server', user)
    },
}