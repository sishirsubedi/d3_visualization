
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt


df_2015 = pd.read_csv("2015movies.csv")
df_2016 = pd.read_csv("2016movies.csv")
df_2015.head(2)
df_2016.head(2)

df_2015["2015 Gross"]=df_2015["2015 Gross"].replace('[\$,]', '', regex=True).astype(float)
df_2016["2016 Gross"]=df_2016["2016 Gross"].replace('[\$,]', '', regex=True).astype(float)

genre15 = pd.DataFrame(df_2015.groupby('Genre').size().reset_index(name='counts'))
genre15 = genre15.iloc[1:,:]
genre15['percent'] = genre15.counts/sum(genre15.counts.values) * 100
genre15


genre16 = pd.DataFrame(df_2016.groupby('Genre').size().reset_index(name='counts'))
genre16 = genre16.iloc[1:,:]
genre16['percent'] = genre16.counts/sum(genre16.counts.values) * 100
genre16


############# 2

names = genre15.Genre.values[0:2]
plt.pie(genre15.percent[0:2])



names = [ 'Comedy (14.9%)-2015', 'Horror (3.5%)-2016']
values = [14.9, 3.5]
fig1, ax1 = plt.subplots()
ax1.pie(values, labels=names, shadow=False)
plt.tight_layout()
plt.show()
plt.title("Movies Comedy vs Horror Genre 2015 vs 2016")

names = genre15.Genre
values = genre15.percent
fig1, ax1 = plt.subplots()
ax1.pie(values, labels=names, autopct='%1.1f%%',shadow=False)
plt.tight_layout()
plt.show()
plt.title("Movies Genre 2015")

names = genre16.Genre
values = genre16.percent
fig1, ax1 = plt.subplots()
ax1.pie(values, labels=names, autopct='%1.1f%%',shadow=False)
plt.tight_layout()
plt.show()
plt.title("Movies Genre 2016")


############ 3


#plt.plot(genre15.counts[0:10],genre16.counts[0:10],'bo')

N = 10
labels = genre15.Genre[0:10].values

plt.subplots_adjust(bottom = 0.1)
plt.scatter(
    genre15.counts[0:10], genre16.counts[0:10], marker='o', cmap=plt.get_cmap('Spectral'))

for label, x, y in zip(labels, genre15.counts[0:10], genre16.counts[0:10]):
    plt.annotate(
        label,
        xy=(x, y), xytext=(-20, 20),
        textcoords='offset points', ha='right', va='bottom',
        bbox=dict(boxstyle='round,pad=0.5', fc='yellow', alpha=0.5),
        arrowprops=dict(arrowstyle = '->', connectionstyle='arc3,rad=0'))

plt.show()
plt.xlabel("Number of Movies in 2015 in each genre")
plt.ylabel("Number of Movies in 2016 in each genre")




N = 10
_2015_movies = genre15.percent[0:10]


ind = np.arange(N)  # the x locations for the groups
width = 0.35       # the width of the bars

fig, ax = plt.subplots()
rects1 = ax.bar(ind, _2015_movies, width, color='r')

_2016_movies = genre16.percent[0:10]
rects2 = ax.bar(ind + width, _2016_movies, width, color='y')

# add some text for labels, title and axes ticks
ax.set_ylabel('Number of movies')
ax.set_title('Number of movies by genre and year')
ax.set_xticks(ind + width / 2)
ax.set_xticklabels(genre15.Genre[0:10].values)
ax.legend((rects1[0], rects2[0]), ('2015', '2016'))
plt.show()