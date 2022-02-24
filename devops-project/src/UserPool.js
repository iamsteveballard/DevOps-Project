import { CognitoUserPool } from "amazon-cognito-identity-js";

import React from "react";
const poolData = {
    UserPoolId: process.env['REACT_APP_.AWS_COGNITO_ID'],
    ClientId: process.env['REACT_APP_.AWS_COGNITO_CLIENT_ID']
    // UserPoolId: "us-west-2_WamlKGmk0",
    // ClientId: "36c65k0lkhaq725oh51b3vf7us"
}
console.log("env variables:",process.env)
console.log("userpoolid:", poolData.UserPoolId)
console.log("clientid:", poolData.ClientId)
console.log("api url:", process.env['REACT_APP_.AWS_API_URL'])
export default new CognitoUserPool(poolData);