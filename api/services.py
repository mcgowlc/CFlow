from twilio.rest import Client
from conf.settings import TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN

# from jobs.models import Job
# from acounts.modesl import User



def message_user(text):
    account_sid = TWILIO_ACCOUNT_SID
    auth_token = TWILIO_AUTH_TOKEN
    client = Client(account_sid, auth_token)

    # for employee in job.employees.all():
    message = client.messages.create(
        body=text,
        from_='+12056273588',
        to='+18646843186'
    )
