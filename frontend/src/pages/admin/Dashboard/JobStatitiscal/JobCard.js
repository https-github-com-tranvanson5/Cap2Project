import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function JobCard() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.login.currentUser);

    return (
        <div>
             Your content goes here
        </div>
    );
}

export default JobCard;
