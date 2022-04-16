# Microservices journey #
## Description ##

> An application allowing the user to create a post with a title, content and a photo (optional).
>
>The uploaded photo is compressed and named with a unique key, the user then has the option of sharing the link of his post so that his friends can see it and send a comment above the post.

6 views are available:
- Homepage, which describe the site and its usage.
- Sign in and Sign up page.
- Dashboard (default page when logged in) displaying your posts.
- Post creation's view.
- Feed displaying recents posts.
- Post view (like Twiter) when you click on a post.

## Front-End Functionnalities ##
1) Create an **account** (name, surname, email, password)
2) **Log into** your account
3) Create a **post** (title, content, image)
4) Edit a **post**
5) **Remove** a post
6) Send **comments** on a post
7) **Remove** a comment
8) **Share** a post

## Back-End Functionalities ##
### API ###
1) CRUD **Users**
2) **JWT** Authentication
3) CRUD **Posts**
4) CRUD **Images** (linked with the Imagery Service)
5) CRUD **Comments**
6) All info linked together in each API request using **`$include`** parameter
### Imagery Service ###

1) Retrieve, Compress and Store images
2) Display image from `GET` route

## Used Technologies ##

Each of our 3 services uses a NodeJs server.
The front-end was made using the Angular framework, the API was made using FeatherJS, a Mariadb database and the Imagery Service used Express to create a REST API.

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)




> # Usage #
> `docker-compose up -d --build`
>
> **⚠ WARNING: for unknown reason, our DBMS (Mariadb) doesn't have enough time to create the database on first launch of the docker before the API tries to connect to it.**
>> ### Solution ###
>> `docker-compose up -d --build && docker-compose stop && docker-compose up -d --build`
>
> If left unchanged, the **.dotenv** presents at the root of the repository will expose our services on **port 81** for the Front-End,  **port 3031** for the API, **port 3001** for the Imagery Service and *port 3307* for the DBMS.
>



