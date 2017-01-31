# checkmate-2016-pokemon

Checkmate is a web based event conducted by ACM student chapter of BITS ACM. This repository contains the code for the event conducted in September 2016.

# Setup Instructions

- To serve the website on apache server engine the following was reffered to and followed :-
https://www.digitalocean.com/community/tutorials/how-to-serve-django-applications-with-apache-and-mod_wsgi-on-ubuntu-14-04

- pokemonData.json and queans.json contain the pokemon and question-answer objects used in the event in .json format.

- scripts.txt contains the information to load the above objects from .json files into the database.

- The name and credentials of the database used (mysql in this case) are clearly specified under the /pokemon/settings.py file.

- Create a custom super user by running the command 'python manage.py createsuperuser' in the shell

- Go to the default admin panel of django and use the credentials entered while creating the superuser to login

- Create an object in the Submit column of the database. !!(Create only one object and no more than that)!!

- Fire up the django API shell, import the controls.py from pokemon folder.

- Call the 'play_on()' function to start the custom login system of the game. Rest of the instructions for controls.py have been commented in the same file.

- Visit the main url and start playing POKEMON-GO-CHECKMATE-2016
