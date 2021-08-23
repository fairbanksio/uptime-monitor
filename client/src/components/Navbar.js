import React, { useContext } from "react";
import {AuthContext} from "../contexts/AuthContext";

function Navbar() {
    const {user,logout} = useContext(AuthContext)

    

    return (
      <div>
        Username: {user.username}
        <button onClick={logout} className="btn btn-success">
          Logout
        </button>
      </div>
    );
  }
  export default Navbar;