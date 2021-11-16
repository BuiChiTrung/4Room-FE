export default {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    }
}

