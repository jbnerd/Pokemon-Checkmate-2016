from django.db import models
from ckeditor.fields import RichTextField
from django.contrib.auth.models import User

POKEMON_TYPES ={
	('1', 'Fire'),
	('2', 'Water'),
	('3', 'Grass'),
	('4', 'Electric')
}

# Create your models here.
class Pokemon(models.Model):
	poke_name = models.CharField(max_length = 30)
	poke_type = models.CharField(max_length = 30, choices = POKEMON_TYPES)
	question_number = models.IntegerField(default = 1)

	def __str__(self):
		return self.poke_name + '-' + str(self.question_number)

class Question(models.Model):
	number = models.IntegerField()
	difficulty_level = models.IntegerField(default = 1)
	content = RichTextField()
	# content = models.CharField(max_length=5000)
	answer = models.CharField(max_length=50)

	def __str__(self):
		return str(self.number) #+ ' : ' + self.answer

class UserProfile(models.Model):
	user = models.OneToOneField(User) #extending user model
	teamname = models.CharField(max_length=200)
	name1 = models.CharField(max_length=200)
	name2 = models.CharField(max_length=200,blank=True)
	phone1 = models.BigIntegerField(null=True)
	phone2 = models.BigIntegerField(blank=True,null=True)
	email1 = models.EmailField()
	email2 = models.EmailField(blank=True,null=True)
	attempted_questions = models.CharField(max_length=59, default = "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0") #storing list of questions attempted. 0,-not attempted, 1-attempted once, 2-twice, 3-thrice/blocked
	correct_questions = models.CharField(max_length=59, default = "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0")#storing the list of correctly attempted questions. 0-attempted wrongly, 1-attempted correctly, 2-on_question
	idno1 = models.CharField(max_length=20)
	idno2 = models.CharField(max_length=20,blank=True)
	ip = models.CharField(max_length=20,blank=True,null=True)
	pokemon = models.ForeignKey(Pokemon, on_delete = models.CASCADE, blank = True,  null = True)
	xp = models.IntegerField(default = 0)
	pokemoney = models.IntegerField(default = 1000)
	fainted = models.IntegerField(default = 0)
	evolution = models.IntegerField(default = 1)
	chosen = models.IntegerField(default = 0)
	submitted = models.IntegerField(default=0)

	def __str__(self):
		return self.user.username

class Submit(models.Model) :
	submit_name = models.CharField(max_length = 10, default = "lol")
	submitted = models.IntegerField(default=1)

	def __str__(self):
		return self.submit_name
