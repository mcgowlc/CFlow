from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Material( models.Model ):
    text = models.CharField(max_length=255)

    def __str__(self):
        return self.text


class Job( models.Model ):
    NOT_STARTED = 'not_started'
    IN_PROGRESS = 'in_progress'
    COMPLETE = 'complete'

    STATUS_CHOICES = [
        (NOT_STARTED, 'not_started'),
        (IN_PROGRESS, 'in_progress'),
        (COMPLETE, 'complete'),
    ]

    supervisor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='supervisor')
    employees = models.ManyToManyField(User)

    location = models.CharField(max_length=255)
    details = models.TextField(null=True, blank=True)
    materials = models.ManyToManyField(Material)

    start_date = models.DateTimeField( null=True, blank=True )
    created_on = models.DateTimeField( auto_now_add=True )
    updated_on = models.DateTimeField( auto_now=True )

    status = models.CharField( max_length=50, choices=STATUS_CHOICES, default=NOT_STARTED )

    def __str__(self):
        return self.location


class Comment(models.Model):
    text = models.CharField( max_length=255 )
    user = models.ForeignKey( User, on_delete=models.CASCADE, related_name="comments")
    job = models.ForeignKey( Job, on_delete=models.CASCADE, related_name="comments" )

    def __str__(self):
        return self.text[:50]

# Create your models here.
