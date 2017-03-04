from tweepy import StreamListener


class TweetListener(StreamListener):

    tweets_per_tick_counter = 0
    tweets = []

    def on_data(self, data):
        if len(self.tweets) < 10:
            self.tweets.append(data)
        self.tweets_per_tick_counter += 1

    def get_count(self):
        temp = self.tweets_per_tick_counter
        self.tweets_per_tick_counter = 0
        return temp

    def get_tweets(self):
        temp = self.tweets
        self.tweets = []
        return temp
