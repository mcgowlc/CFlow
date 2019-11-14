from twilio.rest import Client
from conf.settings import TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN



def message_user():

    account_sid = TWILIO_ACCOUNT_SID
    auth_token = TWILIO_AUTH_TOKEN
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        body='Job Completed' 'Job in-progress',
        from_='+12056273588',
        to='+18646843186'
    )

    return message
