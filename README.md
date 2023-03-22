# Recipe Api
>  This project is a RESTful API built with Django Rest Framework, which provides JWT authentication and enables users to search and share recipes by category and ingredients, with additional functionality for managing, rating, bookmarking and reviewing recipes.
Live demo [_here_](https://recipe-api.up.railway.app/).

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/hagonin/Recipe-Django-NextJs/graphs/commit-activity) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/hagonin/Recipe-Django-NextJs/issues) [![GitHub contributors](https://img.shields.io/github/contributors/Naereen/StrapDown.js.svg)](https://github.com/hagonin/Recipe-Django-NextJs/graphs/contributors) [![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)


![](https://res.cloudinary.com/dui608qtq/image/upload/v1678229231/screenshots/homepage_lip2by.jpg)


## Requirements  (Prerequisites)
* Python 3.10.6 and up 
* Django 4.1.5 and up
* Django Rest Framework 3.14.0
* Django Rest Framework Simple JWT 5.2.2

## Installation
To get this project up and running locally on your computer follow the following steps.
1. Fork or clone this repository to your local machine
2. Create a python virtual environment and activate it
`$ source env/bin/activate` or `env\Scripts\activate on Windows`
3. Open up your terminal and run the following command to install the packages used in this project
`$ pip install -r requirements.txt`
4. Set up a Postgres database for the projec
5. Rename the `.env.example` file found in the root directory of the project to `.env` and update the environment variables accordingly. 
   >Note: For local development, leave the Cloudinary configs empty or setup your local Cloudinary
 6. Run the following commands to setup the database tables and create a super user
 ` python manage.py migrate`
 `python manage.py createsuperuser`
7. Run the development server using : `python manage.py runserver`
8. Open a browser and go to http://localhost:8000/
## Screenshots
![Screenshots of projects](https://res.cloudinary.com/dui608qtq/image/upload/v1678229231/screenshots/category-page_wxdvix.jpg)

![Screenshots of the project](https://res.cloudinary.com/dui608qtq/image/upload/v1678229231/screenshots/recipe-detail_gbaeiz.jpg)

## Features
* 🔍 Powerful search engine with support for full-text search and Trigram Similarity
* 🙎 Custom User model with email and password authentication
* 🔓 Password reset & email verification functionality
* 📗 Interactive UI and flexible customization options for generating documentation using Swagger and ReDoc
* 🔑 Permission classes and throttling management 
* ✨ Frontend is built using Next.js and can be found [here](https://homecook.up.railway.app/)

## Tech Stack / Built With
List down the technology / frameworks / tools / technology in this project.
1. [PostgreSQL](https://www.postgresql.org/) - Database PostgreSQL
2. [Drf-yasg](https://drf-yasg.readthedocs.io/en/stable/)  - Generate real Swagger/OpenAPI 2.0 specifications 
3. [Cloudinary](https://cloudinary.com/) - Platform for all rich media types

## Project Status
Project is: _in progress_  
## Authors
This remarkable project was a collaboration between two self-taught individuals who were inspired by the many brilliant women working in the tech industry. With a shared passion for coding, we worked together tirelessly to bring our vision to life and create something truly special. With dedication and hard work, we were able to build Homecook website which stands as a testament to our passion, creativity and drive. Hope you like it ! 
 
 You can find me here at:
[Ha Gonin](goninha@outlook.fr)  - feel free to contact me 

[Mi Huynh](huynhmi1209@gmail.com)

## License

Usage is provided under the [MIT License](http://opensource.org/licenses/mit-license.php). See LICENSE for the full details.

