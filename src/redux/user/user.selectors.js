import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectSigninPending = createSelector(
  [selectUser],
  user => user.signinPending
)

export const selectSigninFailed = createSelector(
  [selectUser],
  user => user.signinErrormsg
)

export const selectSignupPending = createSelector(
  [selectUser],
  user => user.signupPending
)

export const selectSignupErrormsg = createSelector(
  [selectUser],
  user => user.signupErrormsg
)

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser.user
)

export const selectUserName = createSelector(
  [selectUser],
  user => user.currentUser.user.name
)

export const selectUserEmail = createSelector(
  [selectUser],
  user => user.currentUser.user.email
)

export const selectUserAvatar = createSelector(
  [selectUser],
  user => user.currentUser.user.avatar
)

export const selectUserId = createSelector(
  [selectUser],
  user => user.currentUser.user._id
)

export const selectUserToken = createSelector(
  [selectUser],
  user => user.currentUser.token
)

export const selectUploadProfilePicPending = createSelector(
  [selectUser],
  user => user.uploadProfilePicPending
)

export const selectUploadProfilePicSuccess = createSelector(
  [selectUser],
  user => user.uploadProfilePicSuccessmsg
)

export const selectUploadProfilePicError = createSelector(
  [selectUser],
  user => user.uploadProfilePicErrormsg
)

export const selectDeleteProfilePicPending = createSelector(
  [selectUser],
  user => user.deleteProfilePicPending
)

export const selectEditStatus = createSelector(
  [selectUser],
  user => user.onEditProfile
)

export const selectEditProfilePending = createSelector(
  [selectUser],
  user => user.editProfilePending
)