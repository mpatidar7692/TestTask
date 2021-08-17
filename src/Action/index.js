let newUsers = [];
if (localStorage.getItem("Users")) {
  newUsers = JSON.parse(localStorage.getItem("Users"));
}

export const AddNewUser = (body) => {
  return async (dispatch) => {
    dispatch(Processing());
    newUsers.unshift(body);
    await localStorage.setItem("Users", JSON.stringify(newUsers));
    const lastData = JSON.parse(localStorage.getItem("Users"));
    if (newUsers && newUsers.length == lastData.length) {
      dispatch(Success(newUsers));
    } else {
      dispatch(Fail());
    }
  };
};

export const updateUser = (body, id) => {
  return async (dispatch) => {
    dispatch(Processing());
    newUsers.splice(id, 1, body);
    await localStorage.setItem("Users", JSON.stringify(newUsers));
    const lastData = JSON.parse(localStorage.getItem("Users"));
    if (newUsers && newUsers.length == lastData.length) {
      dispatch(updateSuccess(true));
    } else {
      dispatch(Fail());
    }
  };
};

export function deleteUser(id) {
  return (dispatch) => {
    return dispatch(successDelete(id));
  };
}

export const getUserList = () => {
  return {
    type: "get_user_list",
    payload: newUsers,
  };
};

export function getUser(id) {
  return (dispatch) => {
    const userDetails = newUsers[id];
    dispatch(getUserSuccess(userDetails));
  };
}

export const Processing = () => {
  return {
    type: "is_loading",
  };
};

export const Success = (data) => {
  return {
    type: "add_new_user",
    payload: data,
  };
};

export const updateSuccess = (data) => {
  return {
    type: "update_user",
    payload: data,
  };
};

const getUserSuccess = (data) => {
  return {
    type: "get_user_success",
    payload: data,
  };
};

export const successDelete = (data) => {
  return {
    type: "delete_success",
    payload: data,
  };
};

export const resetData = () => {
  return {
    type: "reset_initial_data",
  };
};

export const Fail = () => {
  return {
    type: "error",
  };
};
