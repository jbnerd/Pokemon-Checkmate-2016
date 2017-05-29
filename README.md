# Checkmate-2016-Pokemon-Go!

Checkmate is BITS Pilani's revolutionary quizzing event, where the participant's aptitude for analytical thinking and logic based problem solving is put to test. Hosted on a web based platform, it is conducted by ACM student chapter of BITS Pilani \- BITSACM in the fall semester of every academic year. The theme idea for September 2016 Checkmate was derived from the famous japanese anime, POKEMON.

# Game Description

* The game consists of 30 questions.
* The participant is given a choice for the starter pokemon in the beginning along with 1000 coins worth of Pokemoney.
* The map of the game consists of 15 pokestops, represented by pokeball symbols, and 15 pokegyms represented by WiFi like symbols.
* A battle and a question awaits the participant at each of these landmarks. A pokestop has an entry fee worth 100 pokemoney coins and a pokegym has an entry fee worth 200 pokemoney coins.
* Battles are won by answering the questions correctly and using the attack button.
  - Pokemoney coins will be awarded thorugh winning battles.
  - The amount of pokemoney and XP awarded will depend upon the type and evolution stage of user's pokemon and the type of opponent's pokemon.
    * more XP and pokemoney will be gained if user's pokemon evolution stage is higher.
    * a bonus XP and pokemoney will be gained if user's pokemon type is weak against opponent's pokemon type e.g. fire vs water.
    * lesser XP and pokemony as compared to the usual will be gained if user's pokemon type is strong against opponent's pokemon type e.g. fire vs grass.
  - User's pokemon evolves after a certain amount of XP is gained by winning the battles.
  - A user cannot revisit the same landmark once a battle is won in it.
* If the answer is incorrect the opponent's pokemon shall attack the user's pokemon resulting in fainting.
  - In case user's pokemon faints, they shall visit the pokemon centre to revive it by spending some coins.
  - User cannot visit any of the landmarks except the pokemon centre when their pokemon faitns.
  - A user can revisit a landmark to re-answer the question and claim the victory for maximum of 3 times.
  - Each visit will change the colour of the corresponding landmark.
    * Pokestop
      - Red: 0 visit
      - Green: 1 visit
      - Blue: 2 visits
      - Black: 3 visits(disabled)
    * Pokegym
      - Blue: 0 visit
      - Pink: 1 visit
      - Yellow: 2 visits
      - Black: 3 visits(disabled)
* The user with the highest amount of pokemoney will win the game.

# Setup Instructions

- To host the website on apache server engine this [tutorial](https://www.digitalocean.com/community/tutorials/how-to-serve-django-applications-with-apache-and-mod_wsgi-on-ubuntu-14-04) was reffered to and followed.

- The name and credentials of the database used (mysql in this case) are clearly specified under the `/checkmate/settings.py` file.
  * database name - `pokeDB`
  * database password - `teamrocket`
  * database user - `checkmate`
  * database host - `localhost`
 - [This](https://www.digitalocean.com/community/tutorials/how-to-use-mysql-or-mariadb-with-your-django-application-on-ubuntu-14-04) tutorial was reffered to while setting up mysql database.

- Open up a terminal in the working directory. Run `python manage.py shell`. Create a custom super user by running the command `python manage.py createsuperuser` in the shell.

- Exit the shell. Run `python manage.py runserver`. Go to the default admin panel of django by entering the url `localhost:8000/admin` in any browser and use the credentials entered while creating the superuser to login.

- Manually create an object in the Submit column of the database. !!(Create only one object and nothing more or less than that)!!

- In a new terminal fire up the django API shell by running `python manage.py shell`. Type in the following commands one by one in it to populate the database :-
```python
from pokemon.views import *
with open('pokemonData.json') as fh:
     data = json.load(fh)
pokeData = []
s = data[0]['model']
for i in data:
     if i['model'] == s:
             pokeData.append(i)
for j in pokeData:
     i = j['fields']
     p = Pokemon()
     p.poke_name = i['poke_name']
     p.poke_type = i['poke_type']
     p.question_number = i['question_number']
     p.save()
     print(j['pk'])
```
```python
from pokemon.views import *
with open('queans.json') as fh:
     data = json.load(fh)
qData = []
s = data[50]['model']
for i in data:
     if i['model'] == s:
             qData.append(i)
for j in qData:
     i = j['fields']
     p = Question()
     p.number = i['number']
     p.content = i['content']
     p.difficulty_level = i['difficulty_level']
     p.answer = i['answer']
     p.save()
     print(j['pk'])
```
- To start the game type in `from pokemon import controls.py`. Call the start game funcion to start the login system of the game by typing in `controls.play_on()`. `controls.game_over()` will close the login system. `controls.get_lost()` will forcefully logout every user from the game.

- The game is now ready to run. Type `sudo systemctl restart apache2.service` and visit the main url `localhost:8000/` to start playing POKEMON-GO-CHECKMATE-2016.

# Functions of various files

- `pokemonData.json` and `queans.json` contain the pokemon and question-answer objects used in the original event in .json format.

- `scripts.txt` contains the commands that need to be typed into the shell to populate the database using the `.json` files.

# Python package dependencies

Virtual Environment can be set up for installing the external python package dependencies.

* virtualenv
* django 1.9.1
* django-ckeditor
* re (regular expressions)
* json
