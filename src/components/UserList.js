import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteUser, resetData, getUserList, updateUser } from "../Action";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "30%",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textInput: { width: "auto", margin: "5% 0% 5% 20%" },
  submitbutton: { margin: theme.spacing(1), margin: "3% 0%" },
}));

const UserList = (props) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    userList: [],
    name: "",
    email: "",
    address: "",
    friends: "",
    id: "",
  });

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    clearErrors();
  };

  useEffect(() => {
    props.getUserList();
  }, [props.userList]);

  useEffect(() => {
    setState({
      ...state,
      userList: props.userList,
    });
  }, [props.userList]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      state.name != "" &&
      state.email != "" &&
      state.address != "" &&
      state.friends != ""
    ) {
      const body = {
        name: state.name,
        email: state.email,
        address: state.address,
        friends: state.friends,
      };
      props.updateUser(body, state.id);
      handleClose();
    }
  };

  useEffect(() => {
    return state;
  }, [open]);

  useEffect(() => {
    if (props.deleteData) {
      var userList = state.userList;
      userList.splice(props.deleteData, 1);
      setState({
        ...state,
        userList,
      });
      localStorage.setItem("Users", JSON.stringify(state.userList));
      props.resetData();
    }
  }, [props.deleteData]);

  const setData = (id) => {
    handleOpen();
    var data = JSON.parse(localStorage.getItem("Users"));
    var info = data[id];
    setState({
      ...state,
      name: info.name,
      email: info.email,
      address: info.address,
      friends: info.friends,
      id: id,
    });
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => props.history.push("/create-user")}
      >
        Add User
      </Button>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropProps={{
            timeout: 500,
          }}
        >
          <>
            <form className={classes.paper} autoComplete="off">
              <div className={classes.textInput}>
                <TextField
                  id="outlined-helperText"
                  label="Name"
                  {...register("name", { required: true })}
                  value={state.name}
                  onChange={(e) => setState({ ...state, name: e.target.value })}
                  variant="outlined"
                />
              </div>

              <div className={classes.textInput}>
                <TextField
                  id="outlined-helperText"
                  label="Email"
                  {...register("email", {
                    required: true,
                  })}
                  value={state.email}
                  onChange={(e) =>
                    setState({ ...state, email: e.target.value })
                  }
                  variant="outlined"
                />
              </div>

              <div className={classes.textInput}>
                <TextField
                  id="outlined-helperText"
                  label="Address"
                  {...register("address", { required: true })}
                  value={state.address}
                  onChange={(e) =>
                    setState({ ...state, address: e.target.value })
                  }
                  variant="outlined"
                />
              </div>

              <div className={classes.textInput}>
                <TextField
                  id="outlined-helperText"
                  label="Friends"
                  {...register("friends", { required: true })}
                  value={state.friends}
                  onChange={(e) =>
                    setState({ ...state, friends: e.target.value })
                  }
                  variant="outlined"
                />
              </div>

              <Button
                type="submit"
                variant="contained"
                size="medium"
                color="primary"
                onClick={(e) => onSubmit(e)}
                className={classes.submitbutton}
              >
                Update User Details
              </Button>
            </form>
          </>
        </Modal>
      </div>

      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>SN</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Friends</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.userList && state.userList.length > 0 ? (
              state.userList.map((user, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>
                      {user.friends &&
                        user.friends.map((friend) => {
                          return friend;
                        })}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        onClick={() => setData(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => props.deleteUser(index)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  component="th"
                  scope="row"
                  align="center"
                >
                  No record found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

function mapStateToProps(state) {
  return {
    userList: state.user,
    deleteData: state.deleteUser,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUserList,
      deleteUser,
      resetData,
      updateUser,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
