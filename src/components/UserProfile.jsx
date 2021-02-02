import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserNameAction, updateProfilePhotoAction } from "../redux/userDucks.js";

const UserProfile = () => {
  const user = useSelector((store) => store.user.user);
  const loading = useSelector((store) => store.user.loading);

  const [userName, setUserName] = useState(user.displayName);
  const [visibleForm, setVisibleForm] = useState(false);
  const [imgError, setImgError] = useState(false);

  const dispatch = useDispatch();

  const updateUserName = () => {
    if (!userName.trim()) {
      console.log("Nombre Vacio");
      return;
    }
    dispatch(updateUserNameAction(userName));
    setVisibleForm(false);
  };

  const selectPhotoArchive = (newImg) => {
    console.log(newImg.target.files[0]);
    const newImgData = newImg.target.files[0];

    if(newImgData === undefined){
      console.log('Image file not Selected!!');
      return
    }


    if(newImgData.type === 'image/png' || newImgData.type === 'image/jpg'){
        dispatch(updateProfilePhotoAction(newImgData))
        setImgError(false)

    }else{
      setImgError(true)
    }

  }



  return (
    <div className="mt-5 text-center">
      <div className="card">
        <div className="card-body">
          <img src={user.photoURL} alt="" className="img-fluid" width="100px" />
          <h5 className="card-title mt-2">
            User Name: <span className="lead">{user.displayName}</span>
          </h5>
          <p className="card-text">Email : {user.email}</p>
          <button onClick={() => setVisibleForm(true)} className="btn btn-dark">
            Edit Name
          </button>

          {imgError && (<div className="alert alert-warning mt-2">
                        Supported types ".PNG" or ".JPG"
                      </div>)}


          <div className="custom-file mt-3">
            <input
              type="file"
              className="custom-file-input"
              id="inputGroupFile01"
              aria-describedby="inputGroupFileAddon01"
              style={{display:'none'}}
              onChange={e => selectPhotoArchive(e)}
              disabled={loading}
            />
            <label className={loading? "btn btn-dark mt-2 disabled" : "btn btn-dark mt-2"} htmlFor="inputGroupFile01">
              Update Profile Photo
            </label>
          </div>
        </div>
        {/*SPINNER LOADING*/}
        {loading && (
          <div className="d-flex justify-content-center my-3">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {visibleForm ? (
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="col-md-5">
                <div className="input-group mb-3">
                  <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="New username"
                    aria-label="New username"
                    aria-describedby="button-addon2"
                  />
                  <div className="input-group-append">
                    <button
                      onClick={() => updateUserName()}
                      className="btn btn-outline-dark"
                      type="button"
                      id="button-addon2"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserProfile;
