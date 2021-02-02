import { auth, firebase, db, storage} from '../firebase'

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

        const user = {
            uid: resp.user.uid,
            email: resp.user.email,
            displayName: resp.user.displayName,
            photoURL: resp.user.photoURL
        }

        const dbUser = await db.collection("users").doc(user.email).get()
        console.log(dbUser.data())
        if(dbUser.exists){ //devuelve true si existe ese usuario en la DB
            //Cuando el usuario existe hay que traer de la DB los datos
            dispatch({
                type: USER_SUCCESS,
                payload: dbUser.data() //data() accede al objeto de la DB
            })
            localStorage.setItem('user', JSON.stringify(dbUser.data()))
            return

        }else{ //si NO existe,,, hay que guardarlo en la DB
            await db.collection("users").doc(user.email).set(user)

            dispatch({
                type: USER_SUCCESS,
                payload: user
            })
    
            localStorage.setItem('user', JSON.stringify(user))
        }

        
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

export const updateUserNameAction = (updatedName) => async (dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    const { user } = getState().user//traemos del state del store, el user
    
    try {

        await db.collection("users").doc(user.email).update({
            displayName: updatedName
        })

        const userMod = {
            ...user,
            displayName: updatedName
        }

        dispatch({
            type: USER_SUCCESS,
            payload: userMod
        })

        localStorage.setItem('user', JSON.stringify(userMod))
        
    } catch (error) {
        console.log(error)
    }
}


export const updateProfilePhotoAction = (updatedImage) => async (dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    const { user } = getState().user;

    try {
        //ref()para guardar archivos en storage, child() para indicar el nombre de la carpeta contenedora
        //2" child() nombre del archivo
        const imgRef = await storage.ref().child(user.email).child('Profile Photo')
        await imgRef.put(updatedImage) //se guarda efectivamente esa imagen en Storage
        const imgURL = await imgRef.getDownloadURL() //nos trae la URL donde esta la Imagen nueva

        console.log(imgURL)

        await db.collection("users").doc(user.email).update({
            photoURL: imgURL
        })

        const userMod = {
            ...user,
            photoURL: imgURL
        }

        dispatch({
            type: USER_SUCCESS,
            payload: userMod
        })

        localStorage.setItem('user', JSON.stringify(userMod))

    } catch (error) {
        console.log(error)
    }


}