from django.contrib import admin

from .models import Job, Comment, Material


class CommentInline(admin.TabularInline):
    model = Comment


class JobAdmin(admin.ModelAdmin):
    inlines = [
        CommentInline,
    ]

# Register your models here.


admin.site.register(Job, JobAdmin)
admin.site.register(Comment)
admin.site.register(Material)

# Register your models here.
