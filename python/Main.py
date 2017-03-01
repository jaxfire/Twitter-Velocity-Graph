import threading

from tweepy import Stream

from python.Authoriser import Authoriser
from python.DataHandler import DataHandler
from python.TweetListener import TweetListener

authoriser = Authoriser()

tweet_listener = TweetListener()

data_handler = DataHandler()

tick_time = 5.0  # Debug is 5 seconds, use 1 minute for real implementation

hash_tags = ['#trump']

# Recursive timer 'tick'
def on_tick():
    threading.Timer(5.0, on_tick).start()
    data_handler.update(tweet_listener.on_tick())

threading.Timer(5.0, on_tick).start()

twitter_stream = Stream(authoriser.get_auth(), tweet_listener)
twitter_stream.filter(track=hash_tags)
