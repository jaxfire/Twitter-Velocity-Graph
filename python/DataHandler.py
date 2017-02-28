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

        # create the raw data string
        raw_text = str(self.tweet_counter[length - 1]) + ","

        # create the verbose string
        verbose_text = "Minute: " + str(length - 1) + ", Num of tweets: " + str(self.tweet_counter[length - 1])\
                        + ", Current mean: " + str(average) + ", Variance: " + str(variance_from_average)

        # append some notifying text if the data is spiking
        if current_value > average * self.spike_qualifier:
            verbose_text += ", DATA SPIKE"
            raw_text += "1"
        else:
            raw_text += "0"

        if length > 1:
            raw_text = "/" + raw_text

        # write to the raw data and verbose files
        with open("python\\match_data_verbose.txt", "a") as verbose, open("python\\match_data_raw.txt", "a") as raw:
            verbose.write(verbose_text + "\n")
            raw.write(raw_text)

        # for live results
        print(verbose_text)

    '''
    # calculates the mean average
    def mean(self, numbers):
        return float(sum(numbers)) / max(len(numbers), 1)
    '''