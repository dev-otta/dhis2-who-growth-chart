## Thoughts

### Growth data sent to component
We need to figure out how to load the child growth, if we just format it to an array and send that then the same component and easy logic can be used
But i think that is weird, because you do not tell people to just send an array, it should be json. Then that json has to have a key named measurement or something else thats general. 
Our component cannot support different keys, another one that might work, but i think is bad is if we always use the second key. Many say that keys are not fixed, then we should not do this. I think it works, but do not know if it is smart.
The first will always be timePeriod, and the second should be the measurement, so it should work, but idk.

### The random percentages
Secondly, the percentages from WHO standard includes P999, P99, P75...
One way we can support such datasets is by mapping the keys, but if they have many keys the chart looks horrible. Then we also need all the percentages to have a color which will be another problem to figure out. 
A solution is to ask the HISP groups and Eirik what they think. 

### Time period and percentages or Z-Scores
I have made two seperate useHooks to identify this. This can be done that way, or we can also tell the user to input metadata for this. We can support both. I put them in two different, can also utilize one, but if the user has f.eks. timeperiod, then we should just run the percent/zscore

### Remove Z-Score 1 
Like they do in the Z-Scores for the WHO standards for length/height-for-age.
Is there a nice way to fix this?
We can tell them to not post it in the chart, that we just map the input data. 

### Label
We need a good way to set the label. I dont know a way to dynamically do this right now. We can also create "codes", basically mappings beetween codes and the label. We can also tell the user to insert with the dataset they upload.