import threading

from Authoriser import Authoriser
from TweetListener import TweetListener
from tweepy import Stream

from python.DataHandler import DataHandler

authoriser = Authoriser()

tweet_listener = TweetListener()

data_handler = DataHandler()

first_run = True


def minute_tick():
    threading.Timer(5.0, minute_tick).start()
    data_handler.add_data(tweet_listener.on_tick())

threading.Timer(5.0, minute_tick).start()

twitter_stream = Stream(authoriser.get_auth(), tweet_listener)
twitter_stream.filter(track=['#chelsea', '#cfc', '#cheswa', '#chelseafc', '#swanseacity', '#swanseacitylive',
                             '#swansofficial', '#swans'])
