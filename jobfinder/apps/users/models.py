from django.db import models

from django.contrib.auth.models import AbstractUser

class User(AbstractUser):

    class UserType(models.TextChoices):
        CANDIDATE = 'CANDIDATE', 'Candidato'
        EMPLOYER = 'EMPLOYER', 'Empregador'

    username = None
    email = models.EmailField('endereço de e-mail', unique=True)
    
    user_type = models.CharField(
        'tipo de usuário',
        max_length=20,
        choices=UserType.choices
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

#info do usuário
#perfil do candidato
class CandidateProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    bio = models.TextField('Biografia', blank=True, null=True)

    birth_date = models.DateField('Data de Nascimento', null=True, blank=True)
    phone_number = models.CharField('Número de Telefone', max_length=15, blank=True)
    cpf = models.CharField('CPF', max_length=14, blank=True, unique=True, null=True)
    cep = models.CharField('CEP', max_length=10, blank=True)
    resume = models.FileField('Currículo', upload_to='resumes/', null=True, blank=True)

    # adicionar o restante depois (ex: telefone, endereço, etc)

    def __str__(self):
        return self.user.get_full_name()

#perfil do empregador
class EmployerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    company_name = models.CharField('Nome da Empresa', max_length=255)
    website = models.URLField('Website', blank=True)
    # adicionar o restante depois (ex: cnpj, etc)

    def __str__(self):
        return self.company_name