Extract data field, save if needed, feed to search algorithm. 

# Search algo 
A way to suggest alphas to try, in hopes that the alpha u try is a good alpha

Doesn't blindly suggest the entire search space - infinite
- method to guide search
- Structure the search and limit search space

How to grade the search algorithm?
- Yield (submitable alphas/no of alpha suggested )
- Diversity (Datasets weighted by unique of dataset)

## Basic Type of search algorithm

**Pattern search**: Giving the algo a template (set of operators and data field) and iterating thru all of them all permutation possibly

Random Search: cover an area

Combine idea: Pattern search use pattern acquired form random search

## Datasets
Data set contain data field 

## Round 1 of simulation
### Datasets
Get Dataset, extract [data fields] from desired dataset
- If vector then put in list/ data frame?
- else put in a matrix 

### Search 
Set simulation settings: (suggest 0 decay since it will have best Sharpe, small delay since it cause overfit, truncation is 0.01 for universe 3000 => Max weight for each stock)
- try risk neutralization

Get a list of operators

### Adjust direction
Potential alphas: high or neg Sharpes


## Round 2 of simulation
Choose potential alphas from the round 1

Add more operators and expression 


Limit operator to around 3-4

# AI alpha Comp

Diverse, simple alpha
Limit operator 

# Submission
Submit able ? just see if prod_corr test == pass
selection of alpha for submission
- score them based on ... 

scheduling timing for submission
- alpha submission quota fail, u dont know if alpha is submittable
- submit last alpha close to 2359 EST


Pyramid 
