import axios from 'axios';
import { deleteAllUsersSuccess } from './allUserSlice';
import {
    getProfileFailed,
    getProfileStart,
    getProfileSuccess,
    getUpdateProfileUsersFailed,
    getUpdateProfileUsersStart,
    getUpdateProfileUsersSuccess
} from './userManagerSlice';
import { deleteUserFailed, deleteUserStart, deleteUsersSuccess } from './userSlice';
  
  export async function getUserById(jwt, dispatch, id) {
    const apiUrl = `http://localhost:8080/api/admin/getUserById?id=${id}`;
    dispatch(getProfileStart());
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Retrieved Data:', data);
      dispatch(getProfileSuccess(data));
      return data;
    } catch (error) {
      dispatch(getProfileFailed(error.message));
      throw error;
    }
  }
  
  export async function updateById(jwt, userId, updatedData, dispatch) {
    // Dispatch the action to indicate that the update process has started
    dispatch(getUpdateProfileUsersStart());
  
    try {
      // Make the API request using the fetch function
      const response = await fetch('http://localhost:8080/api/admin/updateUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({
          userId,
          ...updatedData
        })
      });
  
      // Check if the request was successful (status code in the range 200-299)
      if (response.ok) {
        // Parse the response JSON
        const data = await response.json();
  
        // Dispatch the success action with the received data
        dispatch(getUpdateProfileUsersSuccess(data));
      } else {
        // If the request was not successful, dispatch the failure action
        dispatch(getUpdateProfileUsersFailed());
      }
    } catch (error) {
      // If there was an error in the fetch or processing the response, dispatch the failure action
      dispatch(getUpdateProfileUsersFailed());
    }
  }
  export const changeUserStatus = async (jwt, dispatch, status, id) => {
    dispatch(deleteUserStart());
    try {
        await axios.get(
            `http://localhost:8080/api/admin/changeStatus?id=${id}&status=${status}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        dispatch(deleteUsersSuccess());
    } catch (err) {
        dispatch(deleteUserFailed());
    }
};
  