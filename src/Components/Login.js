import React, {Fragment} from 'react';

const Login = () => {
    return (
        <Fragment>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={()=>console.log("password")}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={()=>console.log("password")}
            />
            <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                onChange={()=>console.log("password")}
            />
        <button type="submit" value="sessions" onClick={()=>console.log("password")}>Login</button>
        <button type="submit" value="signup" onClick={()=>console.log("password")}>Sign Up</button>
      </Fragment>
    );
};

export default Login;