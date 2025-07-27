from django import forms
from .models import User, CandidateProfile, EmployerProfile

class CandidateSignUpForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput(), label="Senha")
    
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']


class EmployerSignUpForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput(), label="Senha")
    company_name = forms.CharField(max_length=255, label="Nome da Empresa")

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']