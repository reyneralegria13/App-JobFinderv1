from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from django.views.generic import TemplateView
from .views import (
    SignUpChoiceView,
    CandidateSignUpView,
    EmployerSignUpView,
    # CandidateProfileUpdateView,
    # EmployerProfileUpdateView
)

urlpatterns = [
    path('', SignUpChoiceView.as_view(), name='signup_choice'),
    path('signup/candidate/', CandidateSignUpView.as_view(), name='candidate_signup'),
    path('signup/employer/', EmployerSignUpView.as_view(), name='employer_signup'),

    path('login/', LoginView.as_view(
        template_name='users/login.html',
        redirect_authenticated_user=True # redireciona se o usuário já estiver logado
    ), name='login'),

    path('logout/', LogoutView.as_view(next_page='login'), name='logout'),
    
    # URL temporária para o dashboard ainda não implementada
    path('dashboard/', TemplateView.as_view(template_name="users/dashboard.html"), name='dashboard'),
]