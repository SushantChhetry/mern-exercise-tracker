import React, { useEffect, useState } from "react";
import axios from "axios";
//need to be able to change the state of the object !!!!!!!!!!!!!!!!!!!!
//need to upload it to GitHub

const CreateUser = () => {
  const [data, setData] = useState({
    username: "",
  });

  useEffect(() => {
    return () => {
      //component did mount
      setData((data) => ({ ...data, username: "", users: [""] }));
    };
  }, []);

  const onChangeUsername = (e) => {
    const newUser = e.target.value;
    setData((data) => ({
      ...data,
      username: newUser,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: data.username,
    };

    console.log(user);
    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setData((data) => ({
      ...data,
      username: "",
    }));
  };
  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            defaultValue={data.username}
            onChange={onChangeUsername}
          ></input>
        </div>
        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
