import React, { useState, useContext } from "react"
import { AccountContext } from "./Account"
import axios from "axios";

const Lambda = () => {

    const [toHash, setToHash] = useState("")
    const [hashResult, setHashResult] = useState("")

    const { loggedIn, jwtToken, username } = useContext(AccountContext)

    const getHash = async(event) => {
        event.preventDefault()
        console.log("toHash:", toHash)
        console.log("jwtToken1:", jwtToken)
        console.log("api url:", process.env["REACT_APP_.AWS_API_URL"])
        const res = await axios({
            method: "POST",
             url: process.env["REACT_APP_.AWS_API_URL"],

            headers: {
                "Content-Type": "application/json",
                Authorization: jwtToken,
            },
            data: {
              tohash: toHash,
              username: username,
              jwtToken: jwtToken
            },
            
          });
        
        console.log(res.data)
        setHashResult(res.data)
        return res.data;

    }
    
    return (
        <div>
            {loggedIn && 
                <div>
                    <form onSubmit={getHash}>
                        <label htmlFor="hash">String to Hash: </label>
                        <input
                            value={toHash}
                            onChange={(event) => setToHash(event.target.value)}
                        ></input>
                        <button type="submit">Get Hash</button>
                    </form>
                    <div>{hashResult}</div>
                    <div>---------------------</div> 
                </div>
            }
            
        </div>
    )
}

export default Lambda;