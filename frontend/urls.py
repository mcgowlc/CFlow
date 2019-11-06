from django.urls import path, re_path

from .views import IndexView

app_name = 'frontend'

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
]
