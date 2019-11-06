from django.urls import path, re_path

from .views import IndexView

app_name = 'frontend'

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('home/', IndexView.as_view()),
    path('schedule/', IndexView.as_view()),
    path('jobs/new/', IndexView.as_view()),
    path('jobs/edit/', IndexView.as_view()),
    path('jobs/detail/<int:pk>/', IndexView.as_view()),
    path('accounts/login/', IndexView.as_view()),
]
