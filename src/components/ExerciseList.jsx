import Link from "react-router-dom";
import Exercise from "./Exercise";
import axios from "axios";
import { useState, useEffect } from "react";

const ExerciseList = () => {
  const [data, setData] = useState({ exercise: [] });

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/")
      .then((response) => {
        setData((data) => ({
          ...data,
          exercise: response.data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteExercise = (id) => {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((res) => console.log(res.data));

    setData((data) => ({
      ...data,
      exercise: data.exercise.filter((el) => el._id !== id),
    }));
  };

  const exerciseList = () => {
    return data.exercise.map((currentExercise) => {
      return (
        <Exercise
          exercise={currentExercise}
          delExercise={deleteExercise}
          key={currentExercise._id}
        />
      );
    });
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
};

export default ExerciseList;
