import {
  API_URL,
  ADMIN,
} from './app'

  //authservice
  export const POST_API_LOGIN = `${API_URL}login`
  
  // admin
  export const GET_API_HOUSE_ZONE = `${API_URL}${ADMIN}/house_zone`
  
//   export const GET_API_LOGOUT = `${API_URL}${AUTH_SERVICE}/logout`
//   export const POST_API_REGISTER = `${API_URL}${AUTH_SERVICE}/Register`
//   export const POST_API_CHECK_TOKEN_VALIDATE = `${API_URL}${AUTH_SERVICE}/checkTokenValidity`
//   export const POST_API_FORGET_PASSWORD = `${API_URL}${AUTH_SERVICE}/forgetPassword`
//   export const POST_API_RESET_PASSWORD = `${API_URL}${AUTH_SERVICE}/resetPassword`
//   export const POST_API_CHANGE_PASSWORD = `${API_URL}${AUTH_SERVICE}/resetPasswordbylogin`
//   export const POST_API_CHECK_PASSWORD = `${API_URL}${AUTH_SERVICE}/checkPassword`
  
//   // User
//   export const GET_API_ALL_USERS = `${API_URL}${AUTH_SERVICE}/user/all`
//   export const PUT_API_UPDATE_USER = `${API_URL}${AUTH_SERVICE}/user/edit`
//   export const GET_API_USER_INFORMATION = `${API_URL}${AUTH_SERVICE}/user/me`
  
//   //Notifications
//   export const GET_SOCKET_USER_NOTIFICATIONS = `ws://dev-tcchub-api.tcctech.app/${NOTI_SERVICE}/v1/notification/ws`
//   export const GET_API_ALL_USER_NOTIFICATIONS = `${API_URL}${NOTI_SERVICE}/v1/notification`
//   export const PUT_API_USER_NOTIFICATIONS = `${API_URL}${NOTI_SERVICE}/v1/notification`
//   export const DELETE_API_USER_NOTIFICATIONS = `${API_URL}${NOTI_SERVICE}/v1/notification`
//   export const GET_API_READ_NOTIFICATIONS = `${API_URL}${NOTI_SERVICE}/v1/notification/readed`
  
//   // Task
//   export const GET_API_TASKS_TAG = `${API_URL}${TASK_SERVICE}/v1/task/tag/project`
//   export const GET_API_USER_TASK = `${API_URL}${TASK_SERVICE}/v1/task`
//   export const GET_API_PROJECT_TASK = `${API_URL}${TASK_SERVICE}/v1/task/projectId`
//   export const POST_API_CREATE_PROJECT_TASK = `${API_URL}${TASK_SERVICE}/v1/task/project`
//   export const POST_API_CREATE_TAG_TASK = `${API_URL}${TASK_SERVICE}/v1/task`
//   export const PUT_API_UPDATE_PROJECT_TASK = `${API_URL}${TASK_SERVICE}/v1/task`
//   export const PUT_API_UPDATE_TAG_TASK = `${API_URL}${TASK_SERVICE}/v1/task/tag`
//   export const DELETE_API_PROJECT_TASK = `${API_URL}${TASK_SERVICE}/v1/task`
//   export const DELETE_API_TAG_TASK = `${API_URL}${TASK_SERVICE}/v1/task/tag`
//   export const GET_API_TASK_CALENDAR_PROJECT = `${API_URL}${TASK_SERVICE}/v1/task`
//   export const POST_API_EXPORT_TIME_SHEET = `${API_URL}/task/v1/task//exportTaskReport`
//   //Approval
//   export const GET_API_APPROVAL = `${API_URL}${APPROVAL_SERVICE}/v1/approval`
//   export const GET_API_STATUS_APPROVAL = `${API_URL}${APPROVAL_SERVICE}/v1/approvals`
//   export const GET_API_USER_STATUS_APPROVAL = `${API_URL}${APPROVAL_SERVICE}/v1/approval/user`
//   export const POST_API_CREATE_APPROVAL = `${API_URL}${APPROVAL_SERVICE}/v1/approval/create`
//   export const POST_API_CREATE_APPROVAL_TEAMLEAD = `${API_URL}${APPROVAL_SERVICE}/v1/approval/teamlead`
//   export const PUT_API_UPDATE__STATUS_APPROVAL = `${API_URL}${APPROVAL_SERVICE}/v1/approval/update-status`
//   export const PUT_API_UPDATE_SENT_REQUEST_APPROVAL = `${API_URL}${APPROVAL_SERVICE}/v1/approval/sent-request`
//   export const DELETE_API_APPROVAL = `${API_URL}${APPROVAL_SERVICE}/v1/approval`
  
//   //Profile
//   export const GET_API_ALL_PROFILE = `${API_URL}${PROFILE_SERVICE}/v1/profiles`
//   export const GET_API_USER_PROFILE = `${API_URL}${PROFILE_SERVICE}/v1/profile`
//   export const GET_API_ROLE_PROFILE = `${API_URL}${PROFILE_SERVICE}/v1/profiles/role`
//   export const GET_API_email_PROFILE = `${API_URL}${PROFILE_SERVICE}/v1/profiles/email`
//   export const GET_API_USER_IMAGES = `${API_URL}${PROFILE_SERVICE}/v1/loade/image`
//   export const GET_API_SEARCH_ORGNAME = `${API_URL}${PROFILE_SERVICE}/v1/profiles/orgs/ชื่อสังกัด`
//   export const DELETE_API_USER_PROFILE = `${API_URL}${PROFILE_SERVICE}/v1/profile`
//   export const POST_API_CREATE_USER_PROFILE = `${API_URL}${PROFILE_SERVICE}/v1/profile`
//   export const PUT_API_UPDATE_USER_PROFILE = `${API_URL}${PROFILE_SERVICE}/v1/profile`
//   export const GET_API_CHECK_SIGNATURE_PROFILE = `${API_URL}${PROFILE_SERVICE}/v1/profile/check-signature`
  
//   //Project
//   export const GET_API_ALL_PROJECTS = `${API_URL}${PROJECT_SERVICE}/v1/projects`
//   export const GET_API_USER_PROJECTS = `${API_URL}${PROJECT_SERVICE}/v1/projects/user`
//   export const GET_API_PROJECT = `${API_URL}${PROJECT_SERVICE}/v1/project`
//   export const POST_API_PROJECT = `${API_URL}${PROJECT_SERVICE}/v1/project`
//   export const PUT_API_PROJECT = `${API_URL}${PROJECT_SERVICE}/v1/project`
//   export const DELETE_API_PROJECT = `${API_URL}${PROJECT_SERVICE}/v1/project`
  
//   //export
//   export const POST_API_EXPORT_ATTENDANCE = `${API_URL}${TASK_SERVICE}/v1/task/exportAttendanceReport`
//   export const POST_API_EXPORT_NET = `${API_URL}${TASK_SERVICE}/v1/task/exportNetReport`
  
//   //Comment