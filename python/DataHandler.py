from statistics import mean


class DataHandler(object):

    tweet_counter = []

    spike_qualifier = 2.2

    def add_data(self, latest_velocity):

        self.tweet_counter.append(latest_velocity)

        length = len(self.tweet_counter)

        # get the latest mean average
        average = round(mean(self.tweet_counter), 2)

        # get the current minute's value
        current_value = self.tweet_counter[len(self.tweet_counter) - 1]

        # Zero value not allowed to avoid 0/0 error
        current_value = 0.01 if current_value == 0 else current_value

        # calculate it's variance from the average
        variance_from_average = round(current_value / average, 2)

        # check for a spike in the data
        spike = False
        if current_value > average * self.spike_qualifier:
            spike = True

        # create the raw data string
        raw_text = str(self.tweet_counter[length - 1])

        # create the verbose string
        verbose_text = "Minute: " + str(length) + ", Num of tweets: " + str(self.tweet_counter[length - 1])\
                        + ", Current mean: " + str(average) + ", Variance: " + str(variance_from_average)

        # append some notifying text if the data is spiking
        if spike:
            verbose_text += ", DATA SPIKE"
            raw_text += "1"
        else:
            raw_text += "0"

        # write to the raw data and verbose files
        with open("python\\match_data_verbose.txt", "a") as verbose, open("python\\match_data_raw.txt", "a") as raw:
            verbose.write(verbose_text + "\n")
            raw.write(raw_text + "\n")

        # for live results
        print(verbose_text)

    '''
    # calculates the mean average
    def mean(self, numbers):
        return float(sum(numbers)) / max(len(numbers), 1)
    '''