from django.conf.urls import url
from . import views

app_name = 'pokemon'

urlpatterns = [
	# /pokemon/
	url(r'^$', views.index, name = 'index'),

	#/pokemon/register/
	url(r'^register', views.register, name = 'register'),

	#/pokemon/login/
	url(r'^login/', views.login, name = 'login'),

	#/pokemon/logout/
	url(r'^logout/', views.logout, name = 'logout'),

	#/pokemon/test/
	url(r'^test/', views.test, name = 'test'),

	#/pokemon/display_question/
	url(r'^display_question/', views.display_question, name = 'display_question'),

	#/pokemon/answer/
	url(r'^answer/', views.answer, name = 'answer'),

	#/pokemon/get_details/
	url(r'^get_details/', views.get_details, name = 'get_details'),

	#/pokemon/rulebook/
	url(r'^show_rulebook/', views.show_rulebook, name = 'show_rulebook'),

	#/pokemon/choose/
	url(r'^choose/', views.choose, name = 'choose'),

	#/pokemon/pokecenter/
	url(r'^pokecenter/', views.pokecenter, name = 'pokecenter'),

	#/pokemon/send_all/
	url(r'^send_all', views.send_all, name = 'send_all'),
]
