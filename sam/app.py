import json
import hashlib
import base64

def lambda_handler(event, context):
    try:
        print("header?:", json.loads(event['header']))
    except:
        print("header not found")
    try:
        print("event112:", event)
        print("event body1:", type(event['body']))
        print("event body2:", json.loads(event['body']))
        print("event body3:", type(json.loads(event['body'])))
    except:
        print("except1")
    try:
        print("event4:", json.loads(event['body'])['hashtest'])
    except:
        print("except2")
        
    # print("eventhash:", event['hashtest'])
    print("context", context)
    str1 = json.loads(event['body'])['hashtest']
    try:
        jwt = json.loads(event['body'])['jwtToken']
        print('jwt:',jwt)
        header, payload, signature = jwt.split(".")
        print('payload:', payload)
        decoded = json.loads(base64.b64decode(payload))
        print('decoded:', decoded['cognito:username'])
    except Exception:
        print('jwt failed')
        print(Exception)
    
    statusCode = 200
    return {
        "statusCode": statusCode,
        "body":"hash-result: " + str1 + ": " + hashlib.sha256(str1.encode()).hexdigest(),
        "headers": {
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        }
    }