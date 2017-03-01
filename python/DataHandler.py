from statistics import mean


class DataHandler(object):

    tweet_counter = []

    spike_qualifier = 1.2  # Debug
    # spike_qualifier = 2.2 # Real

    def update(self, latest_velocity, latest_tweets):

        self.tweet_counter.append(latest_velocity)

        length = len(self.tweet_counter)

        # get the latest mean average
        average = round(mean(self.tweet_counter), 2)

        # get the current minute's value
        current_value = self.tweet_counter[len(self.tweet_counter) - 1]

        # calculate it's variance from the average
        # If the value is zero then it cannot possible be a spike in the data and we avoid a zero / zero error
        if current_value > 0:
            variance_from_average = round(current_value / average, 2)
        else:
            variance_from_average = "NA"

        # create the raw data string
        raw_text = str(self.tweet_counter[length - 1]) + ","

        # create the verbose string
        verbose_text = "Minute: " + str(length - 1) + ", Num of tweets: " + str(self.tweet_counter[length - 1])\
                        + ", Current mean: " + str(average) + ", Variance: " + str(variance_from_average)

        # append relevant info if the data is spiking
        if current_value > average * self.spike_qualifier:
            verbose_text += ", DATA SPIKE"
            raw_text += "1"

            # write the latest selection of tweets
            with open("python\\latest_tweets.txt", "w") as tweets:
                for line in latest_tweets:

                    # slice the relevant information - the actual message of the the tweet
                    start_index = line.index('"text"') + 8
                    dtr_index = line.find(',"display_text_range"')
                    source_index = line.find(',"source"')

                    if -1 < dtr_index < source_index:
                        end_index = dtr_index
                    else:
                        end_index = source_index

                    actual_tweet = line[start_index:end_index]
                    print(actual_tweet)
                    tweets.write(actual_tweet + "<br>")

        else:
            raw_text += "0"

        if length > 1:
            raw_text = "/" + raw_text

        # write to the raw data and verbose files
        with open("python\\match_data_verbose.txt", "a") as verbose, open("python\\match_data_raw.txt", "a")as raw:
            verbose.write(verbose_text + "\n")
            raw.write(raw_text)

        # for debugging
        print(verbose_text)
