library(ggplot2)
library(tidyr)
library(dplyr)
library(jsonlite)

df <- read.csv("web/data/GlobalTemperatures.csv")

## remove all columns other than the date/time and the temperature
dateAndAverageTemp <- df %>% select(dt, LandAverageTemperature)
head(dateAndAverageTemp)
# remove all rows with na values
dateAndAverageTemp <- na.omit(dateAndAverageTemp)
# save to a csv file
write.csv(dateAndAverageTemp, "web/data/dateAndAverageTemp.csv", row.names = FALSE)

df2 <- read.csv("web/data/co2_mm_mlo.csv")
head(df2)
decimalDateandMonthlyAverage <- df2 %>% select(decimal.date, monthy.average)
decimalDateandMonthlyAverage

write.csv(decimalDateandMonthlyAverage, "web/data/co2Dioxide.csv", row.names=FALSE)

co2df <- read.csv("web/data/co2Dioxide.csv")

jsonConverted <- toJSON(co2df)
writeLines(jsonConverted, "web/data/json/co2Time.json")