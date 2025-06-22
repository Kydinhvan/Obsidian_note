Problem: We have a list of cities and the distances between every pair of cities. Suppose we are given a particular route that visits each city exactly once and returns to the origin city. Does this route have the shortest distance, among all such possible routes?

Verifying a “no” answer:
- If we can find another route whose distance is strictly smaller than the distance of the given route, then we can immediately verify that the “no” answer is indeed correct.

Verifying a “yes” answer:
- We need to confirm that every other possible route has a distance that is NOT strictly smaller than the distance of the given route.