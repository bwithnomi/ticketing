import Router from "next/router";
import { useState } from "react";
import useRequest from "../../hooks/use-request";

const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {doRequest, errors} = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: () => Router.push('/')
  });


  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest()
  }

  return <form action="" onSubmit={onSubmit}>
    <h1>sign up</h1>
    <div className="form-group">
      <label htmlFor="">Email</label>
      <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control" />
    </div>
    <div className="form-group">
      <label htmlFor="">Password</label>
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
    </div>
    {errors}
    <button className="btn btn-primary">Sign Up</button>
  </form>
}

export default SignUp;