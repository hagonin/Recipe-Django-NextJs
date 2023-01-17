from django.shortcuts import render

from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required

from . import forms

# Create your views here.
def register(request):
  if request.method == "POST":
    form = forms.UserRegisterForm(request.POST)
    if form.is_valid():
      form.save()
      # cleaned data is a dictionary
      username = form.cleaned_data.get('username')
      messages.success(request, f"{username}, you're account is created!")
      return redirect('recipes-home')
  else:
    form = forms.UserRegisterForm()
  return render(request, 'users/register.html', {'form': form})

@login_required()
def profile(request):
  return render(request, 'users/profile.html')