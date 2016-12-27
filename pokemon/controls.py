from .models import UserProfile, Submit
from django.shortcuts import redirect
from . import views
import re

def play_on():
	sub = Submit.objects.get(submit_name = "lol")
	sub.submitted = 0
	sub.save()
	print('Game on')

def get_lost():
	sub = Submit.objects.get(submit_name = "lol")
	sub.submitted = 1
	sub.save()
	print('Login Closed')

def game_over():
	up = UserProfile.objects.all()

	for i in up :
		i.submitted = 1
		i.save()
	print('Game Over')

def check_data(data):
	nameReg=r'[A-z\s]{3,}'
	emaReg=r'([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)'
	phoReg=r'([0-9]{10})'
	teamReg=r'[\s]'
	if (re.match(teamReg,data['teamname'])) :
		return False
	if not (re.match(emaReg,data['email1']) and re.match(emaReg, data['email2'])):
		return False
	if not (re.match(phoReg, str(data['phone1'])) and re.match(phoReg, str(data['phone2']))):
		return False
	if not (re.match(nameReg, data['name1']) and re.match(nameReg, data['name2'])):
		return False
	else:
		return True
