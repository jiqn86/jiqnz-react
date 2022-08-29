import { UserContext } from '../../context/UserContext';
import React, { useState } from 'react';

export const UserProfile = () => {
    const [userContext] = useState(React.useContext(UserContext));
    return (
        <div className="card shadow profile-container">
            <img src={userContext.user?.photoURL || ""} className="card-img-top medium rounded-circle shadow mt-2" alt="Profile" />
            <div className="card-body">
                <hr />
                <h5 className="card-title text-center">{userContext.user?.displayName}</h5>
                <p className="card-text">Coming soon we could add some nice bio in here so we can display something the user wanna share
                    with the audience</p>
            </div>
        </div>
    )
}