import React, { useState, useContext } from "react"
import { AccountContext } from "./Account"
import axios from "axios";

const Lambda = () => {

    const [toHash, setToHash] = useState("")
    const [hashResult, setHashResult] = useState("")

    const { loggedIn, jwtToken, username } = useContext(AccountContext)
    // console.log("Lambda Token:", jwtToken)

    // useEffect( () => {
    //     const Lambda2 = async () =>{
    //         await fetch('https://y9tchicdn1.execute-api.us-west-2.amazonaws.com/dev/')
    //         .then(response => response.json())
    //         .then(json => {console.log(json)})
    //     }
    //    Lambda2();
    // }, [])

    const getHash = async(event) => {
        event.preventDefault()
        console.log("toHash:", toHash)
        console.log("jwtToken1:", jwtToken)
        console.log("api url:", process.env["REACT_APP_.AWS_API_URL"])
        const res = await axios({
            method: "POST",
            // url: "https://y9tchicdn1.execute-api.us-west-2.amazonaws.com/dev/",
            // url: "https://y9tchicdn1.execute-api.us-west-2.amazonaws.com/dev/sam-test-app-ApiFunction-yFsQ1FOA1tVy",
            // url: "https://ugcfp5wl15.execute-api.us-west-2.amazonaws.com/dev/",
            url: process.env["REACT_APP_.AWS_API_URL"],

            headers: {
                // "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                // 'Access-Control-Allow-Origin': '*',
                Authorization: jwtToken,
            },
            data: {
              hashtest: toHash,
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
                </div>
            }
            
        </div>
    )
}

export default Lambda;