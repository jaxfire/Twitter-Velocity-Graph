from tweepy import Stream
import threading

from Authoriser import Authoriser
from DataHandler import DataHandler
from TweetListener import TweetListener

authoriser = Authoriser()

tweet_listener = TweetListener()

data_handler = DataHandler()

first_run = True


def minute_tick():
    threading.Timer(60.0, minute_tick).start()
    data_handler.add_data(tweet_listener.on_tick())

threading.Timer(60.0, minute_tick).start()

twitter_stream = Stream(authoriser.get_auth(), tweet_listener)
twitter_stream.filter(track=['#chelsea', '#cfc', '#cheswa', '#chelseafc', '#swanseacity', '#swanseacitylive',
                             '#swansofficial', '#swans'])
