import axios from "axios";
import { useState } from "react";

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState([]);
  const doRequest = async () => {
    try {
      setErrors([])
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      setErrors(<div className="alert alert-danger mt-2">
        <h4>Ooops...</h4>
        <ul className="my-0">
          {error.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)}
        </ul>
      </div>)
    }
  }

  return { doRequest, errors }
}