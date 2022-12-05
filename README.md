# Web App Dev 2 - Assignment 1 - ReactJS app.

## Name: [Aaron Delaney] (20092443)

## Overview.
Created a movie application to store your favourite movies and actors. Discover the latest movies and add them to your must watch!

### New Pages.
+ Actor Details Page
	+ Displays spinner icons when loading data from API's
	+ Displays actor images in an image carousel and only displays English based images
	+ Displays what the actors are also known as
	+ Displays actors information such as
		+ DoB 
		+ Gender
		+ Birthday
		+ DeathDay
		+ What department they're known for all within chips containing a tooltip on hover nested inside paper
+ Actors Page
	+ Displays spinner icons when loading data from API's
	+ Displays list of most popular actors from TMDB
	+ Contains an evenly spaced and resizeable grid design
	+ Contains a parallax tilting effect on each card to make them interactable
	+ Provides navigation to actor details page on click
	+ Displayed on actor card
		+ Name
		+ Image
		+ What characters they're known for playing
		+ Popularity ranking created by TMDB
+ Add Movie Review Page
	+ Displays review form that allows users to submit a review
+ Favourite Actors Page
	+ Displays spinner icons when loading data from API's
	+ Retrieves favourite actors for the logged in user from firestore
	+ Queries TMDB to retrieve each favourited actor by logged in user
	+ Displays all their favourited actors
	+ Ability to remove actor favourites from firestore displaying instant updates to the front-end
+ Favourite Movies Page
	+ Displays spinner icons when loading data from API's
	+ Retrieves favourite movies for the logged in user from firestore
	+ Queries TMDB to retrieve each favourited movie by logged in user
	+ Ability to remove movie favourites from firestore displaying instant updates to the front-end
	+ Displays all their favourited movies
	+ Allows for extensive filtering such as
		+ Search by movie name
		+ Filter by movie genres
		+ Sort in alphabetical order (A-Z)
		+ Sort in reverse alphabetical order (Z-A)
+ Homepage
	+ Displays spinner icons when loading data from API's
	+ Ability to add favourites and must watch to logged in user account
	+ Allows for extensive filtering such as
		+ Search by movie name
		+ Filter by movie genres
		+ Sort in alphabetical order (A-Z)
		+ Sort in reverse alphabetical order (Z-A)
+ Login Page
	+ Allows users to login to firebase auth
	+ Provides error handling and reports problems with logging in back to the front end
	+ Redirects to the homepage once a user is successfully logged in
	+ Contains redirects to help new users navigate to the register page if they don't have an account
+ Movie Details Page
	+ Displays spinner icons when loading data from API's
	+ Displays movie images in an image carousel and only displays English based images
	+ Displays movies information such as
		+ Overview
		+ Genres
		+ Length
		+ Revenue
		+ Vote Average
		+ Release Date
		+ Production Companies
		+ Spoken Languages
		+ IMDB Links
		+ Movie Homepage Links
		+ Cast
+ Movie Review Page
	+ Displays reviewer name and username
	+ Displays review contents with supported markdown support
+ Must Watch Page
	+ Displays spinner icons when loading data from API's
	+ Retrieves must watch movies for the logged in user from firestore
	+ Queries TMDB to retrieve each movie marked as must watch by logged in user
	+ Displays all their must watch movies
	+ Ability to remove must watch movies from firestore displaying instant updates to the front-end
+ Popular Movies Page
	+ Displays spinner icons when loading data from API's
	+ Ability to add favourites and must watch to logged in user account
	+ Allows for extensive filtering such as
		+ Search by movie name
		+ Filter by movie genres
		+ Sort in alphabetical order (A-Z)
		+ Sort in reverse alphabetical order (Z-A)
+ Top Rated Movies Page
	+ Displays spinner icons when loading data from API's
	+ Ability to add favourites and must watch to logged in user account
	+ Allows for extensive filtering such as
		+ Search by movie name
		+ Filter by movie genres
		+ Sort in alphabetical order (A-Z)
		+ Sort in reverse alphabetical order (Z-A)
+ Signup Page
	+ Allows users to be created and stored in firebase auth
	+ Provides error handling and reports the problems with signing up back to the front end
	+ Redirects to the homepage and automatically logs in user when account is created
	+ Contains redirects to help users who already have an account navigate to the login page
+ Upcoming Movies Page
	+  Displays spinner icons when loading data from API's
	+ Ability to add favourites and must watch to logged in user account
	+ Allows for extensive filtering such as
		+ Search by movie name
		+ Filter by movie genres
		+ Sort in alphabetical order (A-Z)
		+ Sort in reverse alphabetical order (Z-A)
+ Create Fantasy Movie Page
	+ Displays form for inputing information relating to your custom movie
	+ Displays date pickers and dynamically scalable interfaces to add as many cast members as you would like
	+ Stores data input onto firestore so no user data is lost
+ View Fantasy Movies Page
	+ Displays all created fantasy movies from firestore
	+ Displays them in a card like layout to match the site
	+ Can click cards to get more information about fantasy movie

### New Features.

[ Provide a bullet-point list of the __new features__ you added to the Movies Fan app.] 
 
 e.g.

+ Authentication (using Firebase)
+ Back-End persistence (using Firestore)
+ Fully cached data using back-end persistence and local storage
+ Site wide Dark and Light theme support with built in persistence
+ Ability to add and remove movies from a favourites and must watch list
+ Ability to add and remove actors from a favourites list
+ Support for filtering on top of filtered data such as Upcoming movies, top rated movies, discover movies, most popular movies using
	+  Search by movie name
	+ Filter by movie genres
	+ Sort in alphabetical order (A-Z)
	+ Sort in reverse alphabetical order (Z-A)
+ Sort movie list by release date
+ Sort movie list by top rated
+ Create fantasy movies
+ Support for pagination across all TMDB endpoints that support it
+ Public and Private routes based on user authentication using firebase auth

## Setup requirements.

`Run npm install`

Create an .env file and add the API keys and variables for both Firebase and TMDB

+ https://firebase.google.com/
+ https://www.themoviedb.org/

![](https://i.imgur.com/Jqcc0yP.png)

## TMDB endpoints.

+ /discover/movie - A list of discoverable movies
+ /movie/{movie_id} - Get details for specific movie
+ /movies/{movie_id}/reviews - The user reviews or a movie
+ /person/popular - A list of popular actors
+ /genre/movie/ - Get all genres types
+ /movie/{movie_id}/images - Get all images for specific movie
+ /movie/upcoming/ - Get a list of upcoming movies
+ /movie/popular/ - Get a list of popular movies
+ /movie/top_rated/ - Get a list of top-rated movies
+ /movie/{movie_id}/credits/ - Get entire cast for specific movie
+ /person/{actor_id}/ - Get details for specific actor
+  /person/{actor_id}/images/ - Get images for a specific actor

## App Design.

### Component catalogue.

![](https://i.imgur.com/haJkCQ7.png)

### UI Design.

### HomePage

![](https://i.imgur.com/inw5FVx.png)

>Shows movies from the discover endpoint with multiple sorting and filtering options with interactable and animated cards

### Favourites Page

![](https://i.imgur.com/IfrBSfZ.png)

>Shows all movies user favourited across the application

### Must Watch Page

![](https://i.imgur.com/FLWtT3e.png)

>Shows all movies marked as must watch across the application

### Upcoming Movies Page

![](https://i.imgur.com/RqzWCnW.png)

>Shows all upcoming movies

### Most Popular Movies Page

![](https://i.imgur.com/Wi2yhgB.png)

>Shows all the most popular movies

### Top Rated Movies Page

![](https://i.imgur.com/uOFm0NK.png)

>Shows all top rated movies of all time

### Most Popular Actors Page

![](https://i.imgur.com/veK1kgb.png)

>Shows all the most popular actors

### Favourited Actors Page

![](https://i.imgur.com/m4CJX65.png)

>Shows all favourited actors

### Create Fantasy Movie Page

![](https://i.imgur.com/2i8SvOT.png)

>Shows a form that allows users to create their own fantasy movie

### View Fantasy Movies Page

![](https://i.imgur.com/vuzJffz.png)

>Shows all fantasy movies created by user

### Fantasy Movies Details Page

![](https://i.imgur.com/jbRhObI.png)

>Shows the fantasy movie created in more detail

### Movie Details Page

![](https://i.imgur.com/ci0QOvX.png)

>Shows selected TMDB movie in more detail

### Movie Details Page - Reviews

![](https://i.imgur.com/9YYAvSS.png)

>Shows reviews left by people

### Movie Details Page - Full Review

![](https://i.imgur.com/3tVitQC.png)

>Shows a full review on a specific movie

### Movies Details Page - Create Review

![](https://i.imgur.com/1lN6bbn.png)

>Create your own reviews

### Actors Details Page

![](https://i.imgur.com/DNP3mIn.png)

>Shows more details on a specific actor

### Login Page

![](https://i.imgur.com/71mPs88.png)

>Page to login to access the rest of the website

### Register Page

![](https://i.imgur.com/FtcgN3B.png)

>Page to create accounts to gain access to the website

### Routing.

[ List the __new routes__ supported by your app and state the associated page.]
### Public Routes
+ /login - Allows users to login to app
+ /signup - Allows users to signup to the app

#### Private Routes
+ / - (Homepage) displays discoverable movies
+ /review/form - Form to create your own reviews
+ /reviews/:id - shows a full review by a single person
+ /review/:id - shows details about a particular movie 
+ /movies/favourites - shows users favourited movies
+ /movies/mywatch - shows users must watch movies
+ /movies/upcoming - shows a list of upcoming movies
+ /movies/popular - shows a list of popular movies
+ /movies/rated - shows a list of the most top-rated movies
+ /actors - displays a list of popular actors
+ /actors/:id - shows details about a particular actor
+ /actors/favourites - shows a list of users favourited actors
+ /create/movie - allows users to create own fantasy movie
+ /fantasy-movies - displays all users created fantasy movies
+ /fantasy-movies/:fantasyName - displays a specific fantasy movie in more detail

To access the app requires an account otherwise page will redirected to the signup page.

## Independent learning (If relevant).

+ Firebase Authentication
+ Firebase Firestore

[Firebase API](https://firebase.google.com/docs/reference)

[Firestore API](https://cloud.google.com/firestore/docs/apis)

[TMDB API](https://developers.themoviedb.org/3)

[Mozilla Javascript Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[React Docs](https://reactjs.org/docs/getting-started.html)

[npmjs for obtaining extra packages](https://npmjs.com/)

### Third Party Packages Used
+ [React UUID](https://github.com/RickBr0wn/react-uuid#readme)
+ [React Parallex Tilt](https://mkosir.github.io/react-parallax-tilt/)
+ [React Material UI Carousel](https://github.com/Learus/react-material-ui-carousel#react-material-ui-carousel-)
+ [DayJS](https://github.com/iamkun/dayjs/#getting-started)
+ [x-date-pickers](https://mui.com/x/react-date-pickers/getting-started/)
