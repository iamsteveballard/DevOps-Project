import json
import hashlib
import base64

def lambda_handler(event, context):

    tohash = json.loads(event['body'])['tohash']
    username = json.loads(event['body'])['username']
    try:
        jwt = json.loads(event['body'])['jwtToken']
        header, payload, signature = jwt.split(".")
        encoded_payload = payload.encode()
        padding = b'=' * (4 - (len(encoded_payload) % 4))
        padded_payload = encoded_payload + padding

        decoded_payload = base64.urlsafe_b64decode(padded_payload)
        decoded_username = json.loads(decoded_payload)['cognito:username']

        print('decoded:', decoded_username)

        if decoded_username == username:
            print('whew, no hacker')
        else:
            print("you've been spoofed!")

    except:
        print('jwt failed')
    
    statusCode = 200
    return {
        "statusCode": statusCode,
        "body": hashlib.sha256(tohash.encode()).hexdigest(),
        "headers": {
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        }
    }