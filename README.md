# Jobox Coding Challenge 
This is my response to a coding challenge by [Jobox](https://www.jobox.ai/).

Check out the [live demo](http://alvinnguyen116.github.io/jobox-coding-challenge). 

## Installation
Clone the repo and install the node modules through npm or yarn. 
 
```bash
npm install 
```

Start the application using the "start" script from package.json 
```bash 
npm run start 
```

## Requirements 
- Using React/Redux, implement a single page view.

- Display https://dog.ceo/api/breed/pug/images/random/10 

- Have Infinite Scroll

- Don't display duplicates

- Make it mobile responsive 

- Provide way to filter data by breed

- Feel free to implement extra features

 "Your submission will be evaluated on code organization, quality, 
 performance, as well as the level of UI/UX decisions."
 
## My Approach 
- It seemed possibly network intensive to try to obtain [random image from a breed](https://dog.ceo/dog-api/documentation/breed)
AND ensure uniqueness. Using the random endpoint, there was 
no guarantee I would get back non-duplicates. Instead, 
I fetched all of the [Dogs by breed](https://dog.ceo/dog-api/documentation/breed) and implemented
my own logic for randomness while maintaining uniqueness. The main trade-off is initial load and memory. 


- For infinite scrolling, I actually already created an [Unsplash Demo](https://alvinnguyen116.github.io/project-unsplash-demo/)
 for an article I posted on [Medium](https://medium.com/@alvinnguyen116/virtual-and-infinite-scrolling-in-react-d56a05976cd2)
 on Infinite and Virtual scrolling. Implementation was not too bad, but I did decide 
 to re-make the component to add improvements to this project.
 
- In the design process, I was already thinking 
about how I wanted the app to look on mobile. As a result, I didn't have to do much besides
hit the app with a few Media Queries for responsiveness.

- Instead of a filter selection, I decided on a search selection since there 
 were so many breeds (139 breeds on 04/03/2020). For implementation, I mostly referred 
to a search bar I made for a [personal project](https://alvinnguyen116.github.io/pokedex/).

- For the 'extra features', I implemented:
   1) The ability to favorite a dog and see a list of your favorite dogs 
   2) The ability to toggle dark theme
   3) The ability to toggle between grid and single view
   
- The structure and quality of the code is my interpretation of a production environment.
Components are all documented and organized for readability. I used [Jest](https://jestjs.io/)
for unit testing and [Enzyme](https://enzymejs.github.io/enzyme/) for component testing. 
 
 ## Contributions 
 I'm always open for suggestions and improvements.
 Feel free to create a [pull request](https://github.com/alvinnguyen116/jobox-coding-challenge/pulls) 
 or submit an [issue](https://github.com/alvinnguyen116/jobox-coding-challenge/issues).