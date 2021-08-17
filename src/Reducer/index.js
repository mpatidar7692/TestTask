const auth = (
  state = {
    isLoading: false,
    error: false,
    user: [],
    deleteUser: false,
    userAdded: false,
    updateSuccess: false,
  },
  action
) => {
  switch (action.type) {
    case "is_loading":
      return {
        ...state,
        isLoading: true,
        error: false,
        user: [],
      };
    case "reset_initial_data":
      return {
        ...state,
        userAdded: false,
        deleteUser: false,
        updateSuccess: false,
      };
    case "add_new_user":
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        userAdded: true,
      };
    case "get_user_list":
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case "update_user":
      return {
        ...state,
        isLoading: false,
        updateSuccess: action.payload,
      };
    case "delete_success":
      return {
        isLoading: false,
        deleteUser: action.payload.toString(),
      };
    case "get_user_success":
      return {
        ...state,
        isLoading: false,
        userDetail: action.payload,
      };
    case "fail":
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessages: "Error While Add User",
      };
    default:
      break;
  }
  return state;
};
export default auth;
