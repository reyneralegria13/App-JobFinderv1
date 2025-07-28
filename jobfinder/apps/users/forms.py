from django import forms
from .models import User, CandidateProfile, EmployerProfile

class CandidateSignUpForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput(), label="Senha")
    birth_date = forms.DateField(label='Data de Nascimento', required= False)
    phone_number = forms.CharField(label='Número de Telefone', max_length=15, required= False)
    resume = forms.FileField(label='Currículo', required= False)
    cep = forms.CharField(label='CEP', max_length=10, required= False)
    cpf = forms.CharField(label='CPF', max_length=14, required= False)
    
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 
                   'email', 'password']


class EmployerSignUpForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput(), label="Senha")
    company_name = forms.CharField(max_length=255, label="Nome da Empresa")

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']