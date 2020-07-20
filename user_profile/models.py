from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class UserProfile(models.Model):
    user        = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name   = models.CharField(max_length=80, blank=True, null=True)
    about       = models.CharField(max_length=255, blank=True, null=True)
    location    = models.CharField(max_length=100, blank=True, null=True)
    website     = models.URLField(blank=True, null=True)
    profile_img = models.ImageField(upload_to='build/media',
                                    default="default-images/default-profile-img.png", 
                                    blank=True, 
                                    null=True)
    header_img  = models.ImageField(upload_to='build/media', 
                                    default="default-images/default-header-img.png",
                                    blank=True, 
                                    null=True)

class Recommendation(models.Model):
    owner      = models.ForeignKey(User, on_delete=models.CASCADE, related_name="recommendations")
    content    = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    hashtags   = models.ManyToManyField('Hashtag',
                                         related_name= 'recommendations',
                                         blank=True)
                                      
    def __strg__(self):
        return self.content

    class Meta:
        ordering = ('-created_on',)     

class Comment(models.Model):
    commenter = models.ForeignKey(User, on_delete=models.CASCADE)
    comment_content = models.TextField()
    # each comment has a Recommendation object which it belogs to.
    recommendation = models.ForeignKey('Recommendation', 
                                       on_delete=models.CASCADE, 
                                       related_name="comments", 
                                       null=True)
                                       
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_on',)

class Hashtag(models.Model):
    name = models.CharField(max_length=60, null=True, blank=True)

    def __str__(self):
        return self.name   

class Like(models.Model):
    recommendation = models.ForeignKey('Recommendation', 
                                       on_delete=models.CASCADE, 
                                       related_name="likes", 
                                       )
    user = models.ForeignKey(User,
                              on_delete=models.CASCADE, 
                              related_name="likes", 
                              )    
    class Meta:
        unique_together = ("recommendation", "user")
    def __str__(self):
        return f'{self.user} liked {self.recommendation}'                                                         

class UserFollowing(models.Model):
    user = models.ForeignKey(User, related_name="following", on_delete=models.CASCADE)
    following_user = models.ForeignKey(User, related_name="followers", on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "following_user")
        ordering = ["-created"]

class Notification(models.Model):
    recipient = models.ForeignKey(User, related_name="user_notifications", 
                                        null=True,
                                        on_delete=models.CASCADE)

    sender = models.CharField(max_length=255)  

    description = models.CharField(max_length=255)

    obj_id   = models.IntegerField(null=True)

    follow_obj_id = models.IntegerField(null=True)

    obj_name = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)

    seen = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]