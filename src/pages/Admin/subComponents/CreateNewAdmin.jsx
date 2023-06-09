import axios from 'axios';
import React, { useState } from 'react'

export default function CreateNewAdmin() {
    const [err, setErr] = useState("");
    const [succ, setSucc] = useState("");
    const [disabled, setDisabled] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
          const token = localStorage.getItem("Admintoken");
          setDisabled(true)
          const res = await axios.post("https://asia-south1-team-decrypters.cloudfunctions.net/admin-api/registerAdmin", Object.fromEntries(formData.entries()) ,{
                headers: { Authorization: token },
          });
          e.target.reset()
          res.status < 300 ? setSucc(res.data.msg): setErr(res.data.msg);
        } catch (err) {
          setDisabled(false)
           console.log(err.response);
        }
      };
  

    return (
    <div className="createCamp">
        <h2>Create New Admin</h2>
            <form onSubmit={onSubmit} >
                <label htmlFor='campName'>Camp Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Name"
                    required
                />

                <label htmlFor='email'>Email</label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    required
                />

                <label htmlFor='password'>Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    required
                />

                <button disabled={disabled} type="submit">Update Password</button>
            {err != "" ?
            <h3>{err}</h3>
                :
            <h3 className="success">{succ}</h3>
            }
        </form>
    </div>

  )
}
