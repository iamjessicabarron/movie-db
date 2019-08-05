# Movie DB
A React/TypeScript app for browsing popular movies and TV shows.

## Getting started
Create a `.env.local` file with your MovieDB API key `REACT_APP_API_KEY=<your api key here>` 

Use `npm start` to run the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Notes on development

I avoided using redux and react-router because it's such a small project

Had to choose how to handle search (used same, familiar pattern as Netflix). I'd improve it by adding some kind of delay logic, to only search when the user has finished typing

I left alt tags for posters blank because they wouldn't provide any value - if the API returned a description of the poster, that would go in the alt tag.

I opted not to use `search/multi` as it seemed to return inaccurate results (many Harry Potter movies were returned with a `media_type` of `"tv"` for example), but otherwise I would have preferred to make one, large request rather than two small ones

For the sake of speed I added `transition: all` but I would not normally use `all`, and would fix this (or opt-out of having it at all until it can be done properly) 

There is some repetition of code that I would ideally refactor, particularly in regards to populating `movies` and `tv` states, and displaying of these lists. 

I didn't have time to address `React Hook useEffect has missing dependencies` error but this would be a priority.

## Potential design improvements

Having to scroll so much for TV shows could be frustrating, so could add a better method of navigating to there, or adding a 'display more' mechanism to hide 

Having to scroll down to see TV search results is not ideal either, I'd either implement radio buttons up the top, near the search bar or show both results 

Also a potential fix for above, I would probably pin search to the top, or add some method of quicker access to search when you have scrolled further down

The design is lacking any indication of the media type besides the heading, so adding this would be desirable

Small small design changes could be added where posters or backdrop/cover photos are null, to keep looks consistent - could potentially use a poster with some CSS effect as a backdrop (if available), and provide some kind of backup poster image (potentially multiple) 

## **Known issues**

If overview is too long it will get cut off on smaller screens. I would add a scroll to fix this. 

Posters quality will look degraded on large screens - would ideally show more than 3 pieces of media on the same row on larger screens, scaling with screen size

Search will only show the first page of results, some mechanism (probably pagination, as lazy loading would prevent user from seeing TV results with current design) 

The 'oh no I can't find anything' will appear on loading popular media (like when the app is still opened), it would be better to add some kind of loading state when this is not the case

There is no UI for error handling