# checkmate-2016-pokemon

Checkmate is a web based event conducted by ACM student chapter of BITS ACM. This repository contains the code for the event conducted in September 2016.

# Setup Instructions

- To serve the website on apache server engine the following was reffered to and followed :-
https://www.digitalocean.com/community/tutorials/how-to-serve-django-applications-with-apache-and-mod_wsgi-on-ubuntu-14-04

- pokemonData.json and queans.json contain the pokemon and question-answer objects used in the event in .json format.

- scripts.txt contains the information to load the above objects from .json files into the database.

- The name and credentials of the database used (mysql in this case) are clearly specified under the /pokemon/settings.py file.
