from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from .views import (
    CandidateDashboardView,
    EmployerDashboardView,
    SignUpChoiceView,
    CandidateSignUpView,
    EmployerSignUpView,
    DashboardRedirectView
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
    
    path('dashboard/', DashboardRedirectView.as_view(), name='dashboard_hub'),

    path('dashboard/candidate/', CandidateDashboardView.as_view(), name='candidate_dashboard'),
    path('dashboard/employer/', EmployerDashboardView.as_view(), name='employer_dashboard'),

]