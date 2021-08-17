import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AddNewUser, resetData, getUser, updateUser } from "../Action/index";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 300,
    },
  },
}));

// var params = useParams;

const NewUser = (props) => {
  const { paramId } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [state, setState] = useState({
    name: "",
    email: "",
    address: "",
    friends: [],
  });
  const [id, setId] = useState("");

  const names = [
    "henry Hansen",
    "Van carlos",
    "wilkerson Tucker",
    "Ralph virginia",
    "Omar Abed",
    "Carlos bradley",
    "Andrews Wagner",
    "Bradley Kelly",
    "Jhon Andrews",
    "Kelly kapoor",
  ];

  useEffect(() => {
    if (props.userAdded) {
      props.resetData();
      history.push("/");
    }
    if (props.updateSuccess) {
      props.resetData();
      history.push("/");
    }
    if (props.userDetail) {
      var user = props.userDetail;
      setState({
        ...state,
        name: user.name,
        email: user.email,
        address: user.address,
        friends: user.friends,
      });
    }
  }, [props.userAdded, props.userDetail, props.updateSuccess]);

  useEffect(() => {
    var params = props.match.params;
    if (params.id) {
      setId(params.id);
      props.getUser(params.id);
    }
  }, [props.match.params]);

  const onSubmit = () => {
    if (props.match.params.id) {
      dispatch(updateUser(state, id));
    } else {
      dispatch(AddNewUser(state));
    }
  };

  const handleMultipleChange = (e) => {
    setState({
      ...state,
      friends: e.target.value,
    });
  };

  const handleAddChip = (clip) => {
    let friends = [];
    for (var i in state.friends) {
      friends[i] = state.friends[i];
    }
    friends.push(clip);
    setState({ ...state, friends: friends });
  };

  return (
    <>
      <div className="form-div">
        <form
          className={classes.root}
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            id="standard-error-helper-text"
            placeholder="Name"
            {...register("name", { required: true })}
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
          {errors.name?.type === "required" && (
            <p className="errors">Name is required</p>
          )}

          <TextField
            id="standard-error-helper-text"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
          />
          {errors.email?.type === "required" && (
            <p className="errors">email is required</p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="errors">enter valid email Address</p>
          )}

          <TextField
            id="standard-error-helper-text"
            placeholder="Address"
            {...register("address", { required: true })}
            value={state.address}
            onChange={(e) => setState({ ...state, address: e.target.value })}
          />
          {errors.address?.type === "required" && (
            <p className="errors">Address is required</p>
          )}

          <FormControl>
            <InputLabel fullWidth id="demo-mutiple-name-label">
              Name
            </InputLabel>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              multiple={true}
              value={state.friends}
              onChange={handleMultipleChange}
              input={<Input />}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {errors.friends?.type === "required" && (
            <p className="errors">Friends Field is required</p>
          )}

          <div className="add-user-button">
            {props.match.params.id === undefined ? (
              <Button
                type="submit"
                variant="contained"
                size="medium"
                color="primary"
                className={classes.margin}
              >
                Add User
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                size="medium"
                color="primary"
                className={classes.margin}
              >
                Update
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
    userAdded: state.userAdded,
    userDetail: state.userDetail,
    updateSuccess: state.updateSuccess,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      AddNewUser,
      resetData,
      getUser,
      updateUser,
    },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(NewUser);

// export default NewUser
