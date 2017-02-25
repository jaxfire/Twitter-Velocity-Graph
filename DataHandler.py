class DataHandler(object):

    tweet_counter = []

    spike_qualifier = 2.2

    def add_data(self, latest_velocity):

        self.tweet_counter.append(latest_velocity)

        length = len(self.tweet_counter)

        # get the latest mean average
        mean = round(self.mean(self.tweet_counter), 2)

        # get the last minute's value
        current_value = self.tweet_counter[len(self.tweet_counter) - 1]

        # calculate it's variance form the mean
        variance_from_mean = round(current_value / mean, 2)

        # check for a spike in the data
        spike = False
        if current_value > mean * self.spike_qualifier:
            spike = True

        # create the verbose string
        minute_update = "Minute: " + str(length) + ", Num of tweets: " + str(self.tweet_counter[length - 1])\
                        + ", Current mean: " + str(mean) + ", Variance: " + str(variance_from_mean)

        # append some notifying text if the data is spiking
        if spike:
            minute_update += ", DATA SPIKE"

        # write to the verbose file
        with open("match_data_verbose.txt", "a") as file:
            file.write(minute_update + "\n")

        # write to the raw data file
        with open("match_data_raw.txt", "a") as file:
            file.write(str(self.tweet_counter[length - 1]) + "," + str(mean) + "," + str(variance_from_mean) + "\n")

        # for live results
        print("Running... \n" + minute_update)

    # calculates the mean average
    def mean(self, numbers):
        return float(sum(numbers)) / max(len(numbers), 1)
