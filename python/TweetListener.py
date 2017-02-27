from tweepy import StreamListener


class TweetListener(StreamListener):

    minute_counter = 0

    def on_data(self, data):
        # print(data)
        self.minute_counter += 1

    def on_tick(self):
        temp = self.minute_counter
        self.minute_counter = 0
        return temp
