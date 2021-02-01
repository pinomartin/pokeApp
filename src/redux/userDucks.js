import {auth, firebase} from '../firebase'

//initialData
const initialData = {
    loading: false, //solo para show hide buttons
    active: false //para seguir estado de usuario
}



//Types
const LOADING = 'LOADING';
const USER_ERROR = 'USER_ERROR';
const USER_SUCCESS = 'USER_SUCCESS';
const USER_LOGOUT = 'USER_LOGOUT';

//Reducer
export default function userReducer(state = initialData, action) {

    switch(action.type){
        case LOADING :
            return {...state, loading: true}
        
        case USER_ERROR : 
            return {...initialData}

        case USER_SUCCESS: 
            return {...state, loading: false, active: true, user: action.payload}

        case USER_LOGOUT : 
            return {...initialData}
        
        default :
            return {...state}
    }

}


//Actions
export const loginUserAction = () => async (dispatch) => {

    dispatch({ //independiente de que si se logea exitosamente o no,, el loading se hace true
        type: LOADING
    })

    try {
        const provider = new firebase.auth.GoogleAuthProvider();

        const resp = await auth.signInWithPopup(provider); 
        //auth va sin () ya que se inicializo en su propip archivo
        console.log(resp)
        dispatch({
            type: USER_SUCCESS,
            payload: {
                uid: resp.user.uid,
                email: resp.user.email
            }
        })

        localStorage.setItem('user', JSON.stringify({
            uid: resp.user.uid,
            email: resp.user.email
        }))
        
    } catch (error) {
        console.log(error)

        dispatch({
            type: USER_ERROR
        })
    }
}

export const readActiveUserAction = () => (dispatch) => {
    if(localStorage.getItem('user')){
        dispatch({
            type: USER_SUCCESS,
            payload: JSON.parse(localStorage.getItem('user'))
        })
    }
}

export const logOutSessionAction = () => (dispatch) => {
    auth.signOut();
    localStorage.removeItem('user')
    dispatch({
        type: USER_LOGOUT
    })
}