from django.urls import path, include
from . import views

urlpatterns = [
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/login/', views.CustomAuthToken.as_view(), name='login'),
    path('rest-auth/', include('rest_auth.urls')),
    # only pull jobs for logged in user
    path('jobs/', views.JobAPIData.as_view( {'get': 'list', 'post': 'create'} ) ),

    path('user/', views.UserViewSet.as_view( {'get': 'list'} ) ),
    path('jobs/<int:pk>/', views.JobViewSet.as_view( {'delete': 'destroy', 'get': 'retrieve','put': 'update', 'patch': 'partial_update'} ) ),
    # path('jobs/<int:pk>/', views.JobAPIData.as_view( {'delete': 'destroy', 'get': 'retrieve', 'put': 'update'} ) ),
    path('materials/', views.MaterialAPIData.as_view({'get': 'list', 'post': 'create'})),
    path('materials/<int:pk>/', views.MaterialAPIData.as_view( {'delete': 'destroy', 'get': 'retrieve', 'put': 'update'} ) ),
    path('comments/', views.CommentAPIData.as_view({'get': 'list', 'post': 'create'})),
    path('comments/<int:pk>/', views.CommentAPIData.as_view({'get': 'retrieve', 'delete': 'destroy', 'put': 'update'})),
    path('twiliocall/', views.TwilioAPIData.as_view({'get':'list', 'post':'create'})),
    path('supervisors/', views.SupervisorsAPIData.as_view({'get': 'list'})),
    path('employees/', views.EmployeesAPIData.as_view({'get': 'list'})),
]
