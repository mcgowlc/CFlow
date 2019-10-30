from rest_framework import generics, permissions, viewsets
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.db.models import Q
from rest_framework import viewsets, generics
# from .services import message_user
from rest_framework.response import Response
from accounts.models import User
from . import serializers
from cflow.models import Job, Material, Comment

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username
        })

class UserViewSet( viewsets.ModelViewSet ):
    model = User
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

    class Meta:
        fields = '__all__'


class SupervisorsAPIData(viewsets.ModelViewSet):
    model = User
    queryset = User.objects.filter(is_staff=True)
    serializer_class = serializers.UserSerializer


class EmployeesAPIData(viewsets.ModelViewSet):
    model = User
    queryset = User.objects.filter(is_staff=False)
    serializer_class = serializers.UserSerializer


class JobViewSet( viewsets.ModelViewSet ):
    model = Job
    queryset = Job.objects.all()
    serializer_class = serializers.JobSerializer

    class Meta:
        fields = '__all__'


class JobAPIData( viewsets.ModelViewSet ):
    queryset = Job.objects.all()
    serializer_class = serializers.JobSerializer

    # def get_queryset(self):
    #     if self.request.user.is_superuser:
    #         return Job.objects.all()
    def perform_create(self, serializer):
        supervisor_id = self.request.data['supervisor']
        supervisor = User.objects.get( id=supervisor_id )
        serializer.save( supervisor=supervisor )
        # if current user is listed as the supervisor or as an assigned employee, show job
        return Job.objects.filter( Q( supervisor=self.request.user ) | Q( employees=self.request.user ) )


class MaterialAPIData( viewsets.ModelViewSet ):
    queryset = Material.objects.all()
    serializer_class = serializers.MaterialSerializer


class CommentAPIData( viewsets.ModelViewSet ):
    queryset = Comment.objects.all()
    serializer_class = serializers.CommentSerializer

    def perform_create(self, serializer):
        # import pdb
        # pdb.set_trace()
        serializer.save( user=self.request.user )

    # def get_queryset(self):
    #     user = self.request.user
    #
    #     if self.request.user.is_staff:
    #         # update this to return jobs that were created (employer) by logged in user
    #         return JobItem.objects.all()
    #     else:
    #         # update this to only return the jobs of the logged in user
    #         # something job.employees includes the logged in user
    #         return JobItem.objects.filter(employees=user)


class TwilioAPIData( viewsets.ModelViewSet ):
    queryset = Material.objects.all()

    serializer_class = serializers.MaterialSerializer

    class Meta:
        model = Material
        field = '__all__'

    def create(self, request, *args, **kwargs):
        message_user()

        return Response
