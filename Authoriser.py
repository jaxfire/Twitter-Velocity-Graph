import sys
from tweepy import OAuthHandler


class Authoriser(object):

    auth = None

    def __init__(self):
        # TODO Add your twitter auth codes here
        consumer_key = ''
        consumer_secret = ''
        access_token = ''
        access_secret = ''

        if consumer_key == "" or consumer_secret == "" or access_token == "" or access_secret == "":
            print("Application Terminated \n "
                  "One or more Auth codes are missing - Please update the Authoriser class and re-run")
            sys.exit()

        self.auth = OAuthHandler(consumer_key, consumer_secret)
        self.auth.set_access_token(access_token, access_secret)

    def get_auth(self):
        return self.auth
