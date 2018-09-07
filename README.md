# SUPP

## What's Supp?

Supp is a user-friendly app that sorts users by distance and filters them by common interests/hobbies. Users connect with each other via private chats. 

## Demo video

https://www.youtube.com/watch?v=yG3gEc1bC60&feature=youtu.be

## Technologies

### Front-end
Github:
Front-end >> https://github.com/AlbertCarreras/supp-client

React with Redux & Redux Thunk
  * **Geolocation Web API** for obtaining user’s current location coordinates
    I used W3C Geolocation standard to request the browser the geolocation of the user. The request returns the latitude and longitude of the user which is persisted and used to georeference other nearby users.
    I research the best approach to obtain the location, and decided to go use the Geolocation Web API after reading the following: 
      "Some browsers use IP addresses to detect a user's location. However, it may only provide a rough estimate of a user's location. The W3C approach is the easiest and most fully-supported so it should be prioritized over other geolocation methods."
      https://developers.google.com/maps/documentation/javascript/geolocation
    
  * **Custom CSS** and **Semantic UI elements** for front-end design
    Most of the app is styled using custom CSS. Some elements such as the icons and the modals are Semantic UI elements.
    I decided to use Semantic UI elements because the library facilitated the front-end styling in previous projects. Moreover, I had in mind using modals and liked the examples from the library. However,  

  * **Bad-words** for filtering profane language

### Back-end : Rails API with with serialization and Postgres
Github:
Back-end >> https://github.com/AlbertCarreras/supp-server

  * **Active Storage** for photo storage connected to AWS S3 in production
  * **Action Cable** for live private chat feed updating and connected-user indicators
    Action Cable is the built-in websocket implementation in Rails.
    In order to facilitate the websocket connection from the React front-end, I decided to use react-actioncable-provider. 
    Great resources for implementing websockets in React-Rails apps:
    https://medium.com/@dakota.lillie/using-action-cable-with-react-c37df065f296
  * **Knock** for JSON Web Token authentication and **cookies** for websocket-connection authentication
  * **Geokit** for calculating surrounding users to connected user distance

## Authors

ALBERTO CARRERAS
acarrerasc @gmail.com
https://github.com/AlbertCarreras
https://medium.com/@a.carreras.c/
https://www.linkedin.com/in/albertcarreras/en

I also want to thank Mike Chen () and Matt Lawford (https://www.linkedin.com/in/matthew-lawford-216b67b2/) for their technical support during the project development.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgment

I'm a board game geek. I love playing Dominion, Carcassonne, Star Realms, 7 Wonders, and so forth. I landed in NYC 6 years ago now and have found that is takes a lot of effort to "connect" with people to play board games: you have to go to board games stores, your friends live really far, and more. 

At the same time, NYC has so many passionate people out there and is not difficult to find people who love the same things you love. However, despite having apps such as Meetup, I wanted to create a more genuine app to find people who share my same hobbies or passions and who actually live or are regularly nearby; start a conversation, and plan to meet to do those activities or experience them together. 

Supp is an app to enhance the experience of meeting new people and making new friends. 
