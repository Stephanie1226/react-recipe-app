import { UserActionTypes } from './user.types';

export const resetUser = () => ({type: UserActionTypes.RESET_USER})

export const singinUser = (email, password) => (dispatch) => {
	dispatch({ type: UserActionTypes.SIGN_IN_USER_PENDING })
	fetch('https://chieh-recipe-manager.herokuapp.com/users/login', 
		{
			method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
		})
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				dispatch({ type: UserActionTypes.SIGN_IN_USER_FAILED, payload: "Your login information is wrong..." })
			}
		})
		.then(data => {
			if (data !== undefined) {
				dispatch({ type: UserActionTypes.SIGN_IN_USER_SUCCESS, payload: data })
			}
		})
		.catch(error => dispatch({ type: UserActionTypes.SIGN_IN_USER_FAILED, payload: error }))
}

export const signupNewUser = (displayName, userId, email, password) => (dispatch) => {
	dispatch({ type: UserActionTypes.SIGNUP_NEW_USER_PENDING })
	fetch('https://chieh-recipe-manager.herokuapp.com/users',
		{
			method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
				name: displayName,
				userId: userId,
        email: email,
        password: password
      })
		})
		.then(response => {
			if(response.ok) {
				return response.json();
			} else {
				dispatch({ type: UserActionTypes.SIGNUP_NEW_USER_FAILED, payload: "Something went wrong..." })
			}
		})
		.then(data => {
			if (data !== undefined) {
				dispatch({ type: UserActionTypes.SIGNUP_NEW_USER_SUCCESS, payload: data })
			}
		})
		.catch(error => dispatch({ type: UserActionTypes.SIGNUP_NEW_USER_FAILED, payload: error }))
}

export const uploadProfileImage = (token, profilepic) => (dispatch) => {
	dispatch({ type: UserActionTypes.UPLOAD_PROFILE_PIC_PENDING })
	const formData = new FormData();
	formData.append("avatar", profilepic);
	fetch('https://chieh-recipe-manager.herokuapp.com/users/me/avatar',
	{
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + token
		},
		body: formData
	})
	.then(response => 
		{
			if(response.ok) {
				return response.json();
			} else {
				dispatch({ type: UserActionTypes.UPLOAD_PROFILE_PIC_FAILED, payload: "Something went wrong...Please try it again" })
			}
		}
	)
	.then(data => {
		if (data !== undefined) {
			dispatch({ type: UserActionTypes.UPLOAD_PROFILE_PIC_SUCCESS, payload: data })
		}
	})
	.catch(error => dispatch({ type: UserActionTypes.UPLOAD_PROFILE_PIC_FAILED, payload: error }))
}

export const uploadProfileImageTypeError = (data) => ({
	type: UserActionTypes.UPLOAD_PROFILE_PIC_FAILED,
	payload: data
});

export const deleteProfileImage = (token) => (dispatch) => {
	dispatch({ type: UserActionTypes.DELETE_PROFILE_PIC_PENDING })
	fetch('https://chieh-recipe-manager.herokuapp.com/users/me/avatar',
	{
		method: 'DELETE',
		headers: {
			'Authorization': 'Bearer ' + token
		},
	})
	.then(response => response.json())
	.then(data => {
		if (data !== undefined) {
			dispatch({ type: UserActionTypes.DELETE_PROFILE_PIC_SUCCESS, payload: data })
		}
	})
}

export const logoutCurrentUser = (token) => (dispatch) => {
	fetch('https://chieh-recipe-manager.herokuapp.com/users/logout',
	{
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + token,
			'Content-Type': 'application/json'
		}
	})
	.then(dispatch({ type: UserActionTypes.LOGOUT_CURRENT_USER, payload: {user: {_id: 'no-user'}}}))
};

export const updateUserInfo = (token, displayName, email) => (dispatch) => {
	dispatch({ type: UserActionTypes.UPDATE_USER_INFO_PENDING })
	fetch('https://chieh-recipe-manager.herokuapp.com/users/updateme',
	{
		method: 'PATCH',
		headers: {
			'Authorization': 'Bearer ' + token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: displayName,
			email: email
		})
	})
	.then(response => {
		if(response.ok) {
			return response.json();
		} else {
			dispatch({ type: UserActionTypes.UPDATE_USER_INFO_FAILED, payload: "Action went wrong" })
		}
	})
	.then(data => {
		if (data !== undefined) {
			dispatch({ type: UserActionTypes.UPDATE_USER_INFO_SUCCESS, payload: data })
		}
	})
	.catch(error => dispatch({ type: UserActionTypes.UPDATE_USER_INFO_FAILED, payload: error }))
}

export const deleteProfile = (token) => (dispatch) => {
	dispatch({ type: UserActionTypes.DELETE_PROFILE_PENDING })
	console.log('This is delete profile actionnnnnnnnnnnnnn')
	fetch('https://chieh-recipe-manager.herokuapp.com/users/deleteme',
	{
		method: 'DELETE',
		headers: {
			'Authorization': 'Bearer ' + token
		},
	})
	.then(response => response.json())
	.then(data => {
		if (data !== undefined) {
			dispatch({ type: UserActionTypes.DELETE_PROFILE_SUCCESS, payload: data })
		}
	})
}

export const changeManagePageStatus = (data) => ({
	type: UserActionTypes.MANAGE_PAGE_STATUS,
	payload: data
});

export const onEditProfileName = () => ({type: UserActionTypes.CHANGE_EDIT_NAME_STATUS});

export const onEditProfileEmail = () => ({type: UserActionTypes.CHANGE_EDIT_EMAIL_STATUS});