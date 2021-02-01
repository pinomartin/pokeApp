import React, { useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { loginUserAction } from '../redux/userDucks'

import { withRouter } from 'react-router-dom'

const Login = (props) => {

    const dispatch = useDispatch();
    const loading = useSelector(store => store.user.loading)//para traer states del store
    const isActiveUser = useSelector(store => store.user.active)//para traer states del store
    
    

    useEffect(() => { //si el usuario esta logueado, que me lleve al home
        if(isActiveUser){
            props.history.push("/")
        }
        
    }, [isActiveUser, props.history])

    return (
        <div className="mt-5 text-center">
            <h3>Login with Google</h3>
            <hr/>
            <button 
                className="btn btn-dark"
                onClick={() => dispatch( loginUserAction () )}
                disabled={loading}
            >
                Access
            </button>
        </div>
    )
}

export default withRouter(Login)