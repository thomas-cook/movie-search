# movie-search

A basic react app to search movies on The Movie database


## Setup
If npm is installed on your machine, you can simply clone this repository like:
`git clone https://github.com/thomas-cook/movie-search.git`

Then cd into movie-search and run `npm install`. This will install required dependencies

If attempting to test this in dev mode, please add a .env file in the root of th prject with the entry:
`REACT_APP_MOVIE_API_KEY=<api_key>`

##Design Decisions and challenges
###Choosing a UI library
Ideally wanted easily programmatic support for main widgets like Search Bar, Cards, Rating stars, and a vertical stacking layout without having to implement too much from primitives. 

Considered using React Native Web since many of these came out of the box but noticed some issues in the latest version. Also considered Chakra UI for its simpliciy. Ultimately chose Material UI because 1) support vertically aligned cards with a bit more work 2) Rating Stars widget was very easy to use 3) many examples in the documentation. 

###Images
Initially images loaded from TMDB came many different sizes that threw off the layout of the cards. Or images would not be returned at all. To keep the layout consisent I decided to allocate a fixed dimension for the images and inclduded a placeholder provided by Material UI in the case that a movie had no poster image. 

One issue still present is that while the images are contained to a square on the left of the cards, they don't fill the space and they lose their aspect ratio.  With more time, I'd have looked more deeply into how to best fill the space with different compositions of elements and styling.


##A better experience
To bring this to production, I'd like to mention a few more possible improvements:

* Sort the films by popularity
* Display the total number of films matched by the query and display the page number
* Create a richer state to differentiate between the movies that have been queried rather than similar movies being displayed
