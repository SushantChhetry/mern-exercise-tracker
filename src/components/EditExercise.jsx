import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

const EditExercise = (props) => {
  const [data, setData] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  const { id } = useParams();

  useEffect(() => {
    return () => {
      //component did mount
      axios.get("http://localhost:5000/exercises/" + id).then((response) => {
        setData((data) => ({
          ...data,
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        }));
      });

      axios.get("http://localhost:5000/users/").then((response) => {
        if (response.data.length > 0) {
          setData((data) => ({
            ...data,
            users: response.data.map((user) => user.username),
          }));
        }
      });
    };
  }, []);

  const onChangeUsername = (e) => {
    const newUser = e.target.value;
    setData((data) => ({
      ...data,
      username: newUser,
    }));
  };

  const onChangeDescription = (e) => {
    const newDescription = e.target.value;
    setData((data) => ({
      ...data,
      description: newDescription,
    }));
  };

  const onChangeDuration = (e) => {
    const newDuration = e.target.value;
    setData((data) => ({
      ...data,
      duration: newDuration,
    }));
  };

  const onChangeDate = (date) => {
    const newDate = date;
    setData((data) => ({
      ...data,
      date: newDate,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: data.username,
      description: data.description,
      duration: data.duration,
      date: data.date,
    };

    console.log(exercise);

    axios
      .post("http://localhost:5000/exercises/update/" + id, exercise)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    window.location = "/";
  };
  return (
    <div>
      <h3>Edit Exercise Log</h3>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            defaultValue={data.username}
            onChange={onChangeUsername}
          >
            {data.users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            defaultValue={data.description}
            onChange={onChangeDescription}
          ></input>
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            required
            className="form-control"
            defaultValue={data.duration}
            onChange={onChangeDuration}
          ></input>
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={data.date} onChange={onChangeDate} />
          </div>
        </div>
        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
