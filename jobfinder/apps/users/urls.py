from django.urls import path
from .views import SignUpChoiceView, CandidateSignUpView, EmployerSignUpView

urlpatterns = [
    path('', SignUpChoiceView.as_view(), name='signup_choice'),
    path('signup/candidate/', CandidateSignUpView.as_view(), name='candidate_signup'),
    path('signup/employer/', EmployerSignUpView.as_view(), name='employer_signup'),
]