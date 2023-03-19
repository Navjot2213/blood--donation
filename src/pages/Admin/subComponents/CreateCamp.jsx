import axios from 'axios';
import React, {useState, } from 'react'

export default function CreateCamp() {
    const [err, setErr] = useState("");
    const [succ, setSucc] = useState("");
    const [disabled, setDisabled] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
          const token = localStorage.getItem("Admintoken");
          setDisabled(true)
          const res = await axios.post("https://asia-south1-team-decrypters.cloudfunctions.net/camp-api/createCamp", Object.fromEntries(formData.entries()) ,{
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
        <h2>Create Camp</h2>
            <form onSubmit={onSubmit} >
                <label htmlFor='campName'>Camp Name</label>
                <input
                    type="text"
                    name="campName"
                    id="campName"
                    placeholder="Enter Camp Name"
                    required
                />

                <label htmlFor='location'>Camp Location</label>
                <input
                    type="text"
                    name="location"
                    id="location"
                    placeholder="Enter Camp Location"
                    required
                />

                <label htmlFor='startTime'>Start Date</label>
                <input
                    type="date"
                    name="startTime"
                    id="startTime"
                    required
                />
                <label htmlFor='endTime'>End Date</label>
                <input
                    type="date"
                    name="endTime"
                    id="endTime"
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
