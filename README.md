# Project 4: London Mapper

---
## Overview
---
This was the fourth project for the Software Engineering Immersive course with GA, which consisted of a one week solo full-stack project.

You can find the deployed version of the project [here](https://london-mapper.herokuapp.com/).  

---
## Brief
---
* Build a full-stack application by making your own backend and your own front-end
* Use a Python Django API using Django REST Framework to serve your data from a Postgres database
* Consume your API with a separate front-end built with React
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
* Have a visually impressive design

---
## Technologies Used
---
* JavaScript (ES6+)
* Python
* Django
* PostgreSQL
* React & React Router
* Material UI (MUI)
* HTML5, CSS3, and SASS
* Axios
* VSCode
* Pylint
* Git & GitHub
* TablePlus


## Approach
---


#### Planning
In the beginning I brainstormed different ideas that met the requirements. I decided to create a city mapper clone leverage mapbox and TFL api. I chose this idea as it had real-world utility. Apps like Citymapper and the TfL Journey Planner are hugely popular, and I wanted to challenge myself to process real-world data and use multiple third party APIs.



#### Searching
I wanted my seach to support multiple types of search queries: places, postcodes etc. This is to make it as user-friendly as possible, and to enable users to search for their own home address, or search for the name of a restaurant or pub for example. To do this, I used the mapbox auto complete api and send requests on every inout by the user. Additionally i had to maintain the state of the array of choices in my autocomplete the user intput and the final choice selected by the user. This had to be done for both the journey start and end locations.

### Mapping the Journey
When a user selects a search result, the latitude and longitude of the location is used to make a query to the TfL API, and displays the options for travel on the search page. When a journey is selected, the journey's legs and modes are plotted onto the map, which can be scrolled and interacted with. The legs are coloured according to mode, and the steps are shown in the accordions to the right of the map. In order to achieve the fluid hover effect I had to loop over the map.current object and remove previoulsy added layers and then add layers for the currently selectred journey.

### Save Journeys
Users can save journeys and view them in the My Journyes tab if they are logged in.


---
## Screenshots
---
![Homepage](./client/src/styles/images/londonmapperhome.png)
![My Journeys](./client/src/styles/images/myjourneyspic.png)



## Challenges

### Multiple API's
TFL and mapbox api had different formats for how the data needed to be sent. I had to normalise the data before making each query. Additoinally I had not used mapbox before and had to quickly figure out how it could be used in a React app.

