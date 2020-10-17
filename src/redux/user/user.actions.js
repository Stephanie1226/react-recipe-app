import { UserActionTypes } from './user.types'

const cors_anywhere = 'https://chieh-cors-anywhere.herokuapp.com/'

export const setCurrentUser = user => ({
	type: UserActionTypes.SET_CURRENT_USER,
	payload: user
});

export const signupNewUser = (displayName, email, password) => (dispatch) => {
	fetch('https://chieh-recipe-manager.herokuapp.com/users',
		{
			method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: displayName,
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

export const onEditProfile = () => ({type: UserActionTypes.CHANGE_EDIT_STATUS});

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