# Movie-Fight
## Movie Fight App (Two movies go head-to-head in ratings, and Box Office Earnings etc.)

### - Application Design Patterns - 

#### Challenges
    - 1) Need to somehow fetch data about movies                   
    - 2) Need to build that autocomplete widget from stratch
    - 3) This app would be a lot better with some styling + css, I'll use Bulma!

#### Solutions (the number corresponds with the number above)
    - 1) Should attempt to fetch some data about movies from our JS code using an API. (We'll use omdbapi.com, free API for getting movie data)
    - 2) Should sit down and write out a list of rules that describe how our autocomplete works
    - 3) The CSS framework called 'Bulma CSS' will be used

#### Phase 1 almost complete, but ISSUES WITH IMPLEMENTATION (review phase 1 code, labelled Phase1)
    - All code touches everything
    - Autocomplete widget was suppose to be reusable! It's currently not
    - Autocomplete has knowledge of what a move object is
    - Autocomplete has knowledge of what to show for each option
    - Autocomplete has knowledge of what to do when a movie is clicked
    - Many global variables that refer to specific elements - it will be really
        hard to show a second autocomplete on the screen. 

#### THERE IS A BETTER WAY, SO REFACTOR IT. (Look at Phase2 code)

##### The Plan for Phase 2 
    2 different files: index.js and autocomplete.js

##### index.js - This will house non-reusable code for our very specific project.
    The configuration for Autocomplete:
    - fetchData() function to find movies
    - renderOption() function that knows how to render a movie
    - onOptionSelect() function that gets invoked when a user clicks an option
    - root, root element that the autocomplete should be rendered into 

##### autocomplete.js 
				- Super reusable code to get an autocomplete to work. Zero
                knowledge of 'movies' or 'recipes' or 'blogs'. Must be able
                to be ran several times in the same project

                I'll create a function inside of autocomplete.js that will take
                an autocomplete configuration object that's going to process the 
                options inside that configuration object and then render an 
                autocomplete out onto the screen.
				
### Here are Screen Shots of the Movie Fight Application		
![Image from Gyazo](https://i.gyazo.com/4f43ce393a313677f3bb28e2df111498.png)

![Image from Gyazo](https://i.gyazo.com/18ea7a5d790a5067e3b823f913ab7f7e.png)

