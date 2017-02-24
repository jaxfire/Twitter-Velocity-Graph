class DataHandler(object):

    tweet_counter = []

    def add_data(self, latest_velocity):
        self.tweet_counter.append(latest_velocity)

        print("____TICK____")
        mean = self.mean(self.tweet_counter)
        print("Mean:" + str(mean))
        if self.tweet_counter[len(self.tweet_counter) - 1] > mean:
            print("Greater than the mean")
        print(self.tweet_counter)

    def mean(self, numbers):
        return float(sum(numbers)) / max(len(numbers), 1)
