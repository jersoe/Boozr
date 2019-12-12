# Boozr
COMP426 final project: an app that consumes a 3rd party API and shows cocktail recipes based on available ingredients

Uses https://github.com/jersoe/Boozr-server as a back-end.

Lessons learned:

  -Evaluate 3rd party API before designing whole project around it. The documentation for the search (return only recipes including all ingredients vs return recipes where some of the ingredients are in the query) was incorrect.
  
  -Use Vue or ReactJS, or another framework. Without it it becomes a mess quickly.
  
  -Design programming interfaces before actually starting coding. There is overlap in the calling of the API, and I should have written methods for that instead of doing to same thing multiple times in different methods.
