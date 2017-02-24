from tweepy import OAuthHandler


class Authoriser(object):

    auth = None

    def __init__(self):
        consumer_key = 'NBCOR2vehqdi4RxzZ7YrajfN8'
        consumer_secret = 'LCCVqOWyxz8qmrfnEcTNKhQ5BX7JKMPUGTkapLpoWOp2E4bphH'
        access_token = '1712718440-pmkNBcYwZWPUk1FX8rBCnrwTfTDqJxx1GeDGYen'
        access_secret = 'QXVdGDal4E5TUmt60TDN8xPH1pH0GC0y376LFzlBIMVJg'

        self.auth = OAuthHandler(consumer_key, consumer_secret)
        self.auth.set_access_token(access_token, access_secret)

    def get_auth(self):
        return self.auth
