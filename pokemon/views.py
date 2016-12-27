from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, Http404
from .models import Pokemon, UserProfile, Question, Submit
from django.contrib.auth import authenticate, login
from django.contrib import auth
from django.views.generic import View
from django.views import generic
from .forms import TeamForm, LoginForm
from django.db import IntegrityError
from django.contrib.auth.models import User
import json
from django.core import serializers
from django.contrib.auth.decorators import login_required
from .controls import *

# Create your views here.
def test(request):
	return HttpResponse('Is this working?')

def index(request):
	if not request.user.is_authenticated() :
		return redirect('/pokemon/register')
	else :
		up = UserProfile.objects.get(user = request.user)
		if up.submitted == 1 :
			resp = {
				'status' : 2,
				'error_message' : "Time's up"
			}
			return HttpResponse(json.dumps(resp), content_type = "application/json")
		if up.chosen == 0 :
			#up.chosen = 1
			#up.save()
			print('not chosen')
			return redirect('/pokemon/choose')
		else :
			print('chosen')
			return render(request, 'pokemon/main.html')

def register(request):
	if request.user.is_authenticated() :
		return redirect('/pokemon/')
	else :
		if request.method == 'POST' :
			form = TeamForm(request.POST)
			if form.is_valid() :
				data = form.cleaned_data
				if not check_data(data):
					error_message = 'Form fields are not correct.Regex error. Enter them properly.'
					resp = { 'status': 0 , 'message' : message }
					return HttpResponse(json.dumps(resp), content_type = "application/json")

				u = User()
				u.username = data['teamname']
				u.set_password(data['password'])

				try :
					u.save()
				except IntegrityError :
					message = 'Username already exists'
					resp = { 'status': 0 , 'message' : 'Team name already registered' }
					return HttpResponse(json.dumps(resp), content_type = "application/json")

				up = UserProfile()
				up.user = u
				up.teamname = data['teamname']
				up.name1 = data['name1']
				up.name2 = data['name2']
				up.phone1 = data['phone1']
				up.phone2 = data['phone2']
				up.email1 = data['email1']
				up.email2 = data['email2']
				up.idno1 = data['idno1']
				up.idno2 = data['idno2']
				up.save()

				resp = { 'status': 1 ,'message': 'Successfully Registered', 'teamname' : up.teamname}
				return HttpResponse(json.dumps(resp), content_type = "application/json")
			else:
				message = 'Form fields are not correct. Enter them properly.'
				resp = { 'status': 0 , 'message' : message }
				return HttpResponse(json.dumps(resp), content_type = "application/json")

		else :
			form = TeamForm()
			return render(request, 'pokemon/register.html', {'form' : form})

def login(request) :
	if request.user.is_authenticated() :
		return redirect('/pokemon/')

	if request.POST :
		form = LoginForm(request.POST)

		if form.is_valid() :
			data = form.cleaned_data
			teamname = data['teamname']
			password = data['password']
			user = authenticate( username = teamname, password = password)
			try :
				up = UserProfile.objects.get(user = user)

				if up.submitted == 1 :
					resp = {
						'status' : 2,
						'error_message' : "Time's up"
					}
					return HttpResponse(json.dumps(resp), content_type = "application/json")

				sub = Submit.objects.get(submit_name = "lol")
				if sub.submitted == 1 or up.submitted == 1:
					resp={
						'status':0,
						'error_message': 'The Game has not started yet ! Stay tuned'
					}
					return HttpResponse(json.dumps(resp), content_type = 'application/json')
			except :
				resp={
					'status':0,
					'error_message':'Username or password is incorrect'
				}
				return HttpResponse(json.dumps(resp), content_type = 'application/json')

			if user is not None :
				if user.is_active :
					auth.login(request, user)
					resp = {
						'status': 1,
						'message' : 'Successfully Logged In'
					}
					return HttpResponse(json.dumps(resp), content_type = 'application/json')
				else :
					resp = {
						'status': 0,
						'error_message' : 'Your account is not active, please contact the site admin.'
					}
					return HttpResponse(json.dumps(resp), content_type = 'application/json')

			else :
				resp = {
					'status': 0,
					'error_message' : "Your username and/or password were incorrect."
				}
				return HttpResponse(json.dumps(resp), content_type = 'application/json')
		else :
			resp = {
				'status': 0,
				'error_message' : "Your from credentials are not valid."
			}
			return HttpResponse(json.dumps(resp), content_type = 'application/json')

	else :
		form = LoginForm()
		return render(request, 'pokemon/register.html', {'form':form})

@login_required
def get_details(request) :
	user = request.user
	try :
		up = UserProfile.objects.get(user = user)
	except :
		raise Http404
	# still remaining status

	resp = {
		'status' : 1,
		'pokemon' : (up.pokemon.question_number%10),
		'teamname' : up.teamname,
		'attempted_questions' : up.attempted_questions,
		'correct_questions' : up.correct_questions,
		'xp' : up.xp,
		'evolution_state':up.evolution,
		'pokemoney' : up.pokemoney,
		'fainted' : up.fainted
	}
	return HttpResponse(json.dumps(resp), content_type = "application/json")


@login_required
def logout(request) :
	auth.logout(request)
	return redirect('/pokemon/login/')

@login_required
def display_question(request):
	user = request.user
	up = UserProfile.objects.get(user = user)

	if up.submitted == 1 :
		resp = {
			'status' : 2,
			'error_message' : "Time's up"
		}
		return HttpResponse(json.dumps(resp), content_type = "application/json")


	if request.POST :
		if str(request.POST.get('no')).isdigit():
			number = int(request.POST.get('no'))
		else:
			raise Http404
	else:
		raise Http404

	try:
		question = Question.objects.get(number = number)
		pokemon = Pokemon.objects.get(question_number = number)
	except:
		raise Http404

	if question.difficulty_level == 1 :
		lol = 100
	else:
		lol = 200
	up.pokemoney -= lol
	trial = (int(number) - 1)
	aq = up.attempted_questions.split()
	cq = up.correct_questions.split()

	if aq[trial] == 3 :
		resp = {
			'status' : 0,
			'error_message' : 'You cannot attempt this question anymore.'
		}
		return HttpResponse(json.dumps(resp), content_type = "application/json")
	elif cq[trial] == 1:
		resp = {
			'status' : 0,
			'error_message' : 'You cannot attempt this question anymore.'
		}
		return HttpResponse(json.dumps(resp), content_type = "application/json")

	aq[trial] = str(int(aq[trial])+1)
	up.attempted_questions = ' '.join(aq)
	resp = {
		'status': 1,
		'question' : str(question.content),
		'visited' : aq[trial],
		'amount_deducted' : lol,
		'poke_type_1' : up.pokemon.poke_type,
		'poke_type_2' : pokemon.poke_type
	}

	up.save()

	return HttpResponse(json.dumps(resp), content_type = "application/json")

@login_required
def answer(request):

	if request.POST:

		number = int(request.POST.get('no'))
		answer = str(request.POST.get('answer'))

		question = get_object_or_404(Question, number = number)
		user = request.user
		try:
			up = UserProfile.objects.get(user = user)
		except:
			raise Http404('Are you even authentic??')

		if up.submitted == 1 :
			resp = {
				'status' : 2,
				'error_message' : "Time's up"
			}
			return HttpResponse(json.dumps(resp), content_type = "application/json")

		trial = (int(number) - 1)
		aq = up.correct_questions.split()
		cq = up.correct_questions.split()

		if aq[trial] == 3 or cq[trial] == 1 :
			raise Http404('You cannot attempt this question any further. Do not try to cheat :)')

		GymPokemon = get_object_or_404(Pokemon, question_number = number)
		GPokeType = GymPokemon.poke_type
		PokeType = up.pokemon.poke_type

		if PokeType == '1':
			if GPokeType == '2':
				stat = 100
			elif GPokeType == '3':
				stat = -100
			else:
				stat = 0
		elif PokeType == '2':
			if GPokeType == '1':
				stat = -100
			elif GPokeType == '4':
				stat = 100
			else:
				stat = 0
		elif PokeType == '3':
			if GPokeType == '1':
				stat = 100
			elif GPokeType == '4':
				stat = -100
			else:
				stat = 0
		else:
			if GPokeType == '2':
				stat = -100
			elif GPokeType == '3':
				stat = 100
			else:
				stat = 0

		answer = answer.lower()

		if answer == question.answer:

			trial = (int(number) - 1)
			aq = up.correct_questions.split()
			aq[trial] = str(int(aq[trial])+1)
			up.correct_questions = ' '.join(aq)

			cq = up.correct_questions.split()
			cq[trial] = '1'
			up.correct_questions = ' '.join(cq)

			if question.difficulty_level == 1:
				up.pokemoney += (500 + stat)
				up.xp += (500 + stat)
			else:
				up.pokemoney += 2*(500 + stat)
				up.xp += 2*(500 + stat)


			if up.xp >= 8000:
				evoultion_state = 3
			elif up.xp >= 4000:
				evoultion_state = 2
			else :
				evoultion_state = 1


			if up.evolution == evoultion_state :
				evolved = 0
			else :
				evolved = 1
				up.evolution = evoultion_state

			if evolved == 1:
				if up.evolution == 2 :
					if up.pokemon.poke_type == 1 :
						up.pokemon = Pokemon.objects.get(poke_name = 'Charmelion')
					elif up.pokemon.poke_type == 2 :
						up.pokemon = Pokemon.objects.get(poke_name = 'Wartortle')
					elif up.pokemon.poke_type == 3 :
						up.pokemon = Pokemon.objects.get(poke_name = 'Ivysaur')
					elif up.pokemon.poke_type == 4 :
						up.pokemon = Pokemon.objects.get(poke_name = 'Pikachu')
				elif up.evolution == 3 :
					if up.pokemon.poke_type == 1 :
						up.pokemon = Pokemon.objects.get(poke_name = 'Charizard')
					elif up.pokemon.poke_type == 2 :
						up.pokemon = Pokemon.objects.get(poke_name = 'Blastoise')
					elif up.pokemon.poke_type == 3 :
						up.pokemon = Pokemon.objects.get(poke_name = 'Venusaur')
					elif up.pokemon.poke_type == 4 :
						up.pokemon = Pokemon.objects.get(poke_name = 'Raichu')

			up.save()

			print(up.pokemon.poke_type,up.pokemon,up.pokemon.question_number)
			resp = {
				'status': 1,
				'xp' : up.xp,
				'pokemoney' : up.pokemoney,
				'fainted' : up.fainted,
				'visited' : aq[trial],
				'correct' : cq[trial],
				'evolved' : evolved,
				'evolution_state' : evoultion_state,
				'pokemon' : (up.pokemon.question_number%10)
			}

			return HttpResponse(json.dumps(resp), content_type = "application/json")

		else:
			up.fainted = 1
			up.save()

			resp = {
				'status': 0,
				'fainted' : up.fainted,
				'xp' : up.xp,
				'pokemoney' : up.pokemoney
			}
			return HttpResponse(json.dumps(resp), content_type = "application/json")

	else:
		resp = {
			'status' : 1
		}
		return HttpResponse(json.dumps(resp), content_type = "application/json")

def show_rulebook(request):
	return render(request, 'pokemon/rulebook.html')

@login_required
def choose(request):
	if request.POST:
		user = request.user
		up = UserProfile.objects.get(user=user)

		if up.submitted == 1 :
			resp = {
				'status' : 2,
				'error_message' : "Time's up"
			}
			return HttpResponse(json.dumps(resp), content_type = "application/json")

		if up.chosen == 1 :
			return render(request, 'pokemon/main.html')

		pokemon = request.POST.get('pokemon')
		up.pokemon = Pokemon.objects.get(poke_name = pokemon)
		up.chosen = 1
		up.save()

		resp = {
			'teamname' : up.teamname,
			'status' : 1
		}

		return HttpResponse(json.dumps(resp), content_type = 'application/json')

	else:
		return render(request, 'pokemon/select-pokemon.html')


@login_required
def pokecenter(request):
	user = request.user
	up = UserProfile.objects.get(user=user)

	if up.submitted == 1 :
		resp = {
			'status' : 2,
			'error_message' : "Time's up"
		}
		return HttpResponse(json.dumps(resp), content_type = "application/json")

	if up.evolution == 1:
		amount_deducted = 300
	elif up.evolution == 2:
		amount_deducted = 200
	elif up.evolution == 3:
		amount_deducted = 100

	if request.POST:
		up.pokemoney -= amount_deducted
		up.fainted = 0
		up.save()

		resp = {
			'status' : 1,
			'amount_deducted' : amount_deducted,
			'pokemoney' : up.pokemoney,
			'fainted' : up.fainted,
			'xp' : up.xp
		}

		return HttpResponse(json.dumps(resp), content_type = "application/json")

	else :
		resp = {
			'amount_deducted' : amount_deducted
		}

		return HttpResponse(json.dumps(resp), content_type = "application/json")


def send_all(request):
	up = UserProfile.objects.all()

	server_no = 2

	resp = {}
	players = []

	for i in up :
		details = {
			'teamname' : i.teamname,
			'pokemoney' : i.pokemoney,
			'name1' : i.name1,
			'name2' : i.name2,
			'server' : server_no
		}

		players.append(details)

	resp['players'] = players

	return HttpResponse(json.dumps(resp), content_type = "application/json")


'''
def ajax(request):
    data = {}
    data['something'] = 'useful'
    return HttpResponse(json.dumps(data), content_type = "application/json")

This would work fine if you fill the data your self, but if you are getting the data from a model try the following:

def tasks_json(request):
    tasks = Task.objects.all()
    data = serializers.serialize("json", tasks)
    return HttpResponse(data, content_type='application/json')
'''
