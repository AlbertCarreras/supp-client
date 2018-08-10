// ADAPTERS
import {API} from './AdapterUser'
import AdapterUser from './AdapterUser';

class AdapterUsers {

    static  getClosestUsers() {
        return fetch(`${API}/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AdapterUser.getToken()}`
            }
        })
        .then(resp => resp.json())
    }

}
export default AdapterUsers;
