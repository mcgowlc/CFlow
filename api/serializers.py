from rest_framework import serializers

# from backend.models import Users
from cflow.models import Job, Material, Comment
from accounts.models import User

import json


class UserSerializer( serializers.ModelSerializer ):
    class Meta:
        model = User

        fields = ('username', 'id', 'first_name', 'last_name')


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'

        # def create(self, validated_data):
        #     # import pdb
        #     # pdb.set_trace()
        #     data = validated_data.copy()
        #     data['user'] = self.context['request'].user
        #
        #     return super(CommentSerializer, self).create(data)

        def update(self):
            import pdb
            pdb.set_trace()


class MaterialSerializer( serializers.ModelSerializer ):
    class Meta:
        model = Material
        fields = ('id', 'text')


class JobSerializer( serializers.ModelSerializer ):
    comments = CommentSerializer(many=True, required=False)
    materials = MaterialSerializer(many=True, required=False)
    employees = UserSerializer(many=True, required=False)


    # def is_valid(self, raise_exception=False):
    #     import pdb
    #     pdb.set_trace()

    # def validate(self, attrs):
    #     # import pdb
    #     # pdb.set_trace()
    #     if 'materials' in attrs:
    #         attrs['materials'] = json.loads(self.context['request'].data['materials'])
    #     return attrs

    # def create(self, validated_data):
    #     import pdb
    #     pdb.set_trace()


    class Meta:
        model = Job
        fields = ('id', 'supervisor', 'employees', 'location', 'details', 'materials', 'start_date', 'status', 'comments')
        depth = 1
