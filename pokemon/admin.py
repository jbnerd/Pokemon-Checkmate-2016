from django.contrib import admin
from .models import Pokemon, Question, UserProfile, Submit

# Register your models here.
admin.site.register(Pokemon)
admin.site.register(Question)
admin.site.register(UserProfile)
admin.site.register(Submit)