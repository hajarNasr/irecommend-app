from django.contrib import admin
from .models import Recommendation, Hashtag, UserFollowing, Comment, Like, Notification

admin.site.register(Recommendation)
admin.site.register(Hashtag)
admin.site.register(UserFollowing)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(Notification)