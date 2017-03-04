import sys
from tweepy import OAuthHandler


class Authoriser(object):

    auth = None

    def __init__(self):
        # TODO Add your twitter auth codes here
        consumer_key = 'NBCOR2vehqdi4RxzZ7YrajfN8'
        consumer_secret = 'LCCVqOWyxz8qmrfnEcTNKhQ5BX7JKMPUGTkapLpoWOp2E4bphH'
        access_token = '1712718440-pmkNBcYwZWPUk1FX8rBCnrwTfTDqJxx1GeDGYen'
        access_secret = 'QXVdGDal4E5TUmt60TDN8xPH1pH0GC0y376LFzlBIMVJg'

        if consumer_key == "" or consumer_secret == "" or access_token == "" or access_secret == "":
            print("Application Terminated \n "
                  "One or more Auth codes are missing - Please update the Authoriser class and re-run")
            sys.exit()

        self.auth = OAuthHandler(consumer_key, consumer_secret)
        self.auth.set_access_token(access_token, access_secret)

    def get_auth(self):
        return self.auth
