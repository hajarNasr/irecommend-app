from .models import UserProfile 
from django.db.models.signals import post_save, pre_delete
#from notifications.signals import notify
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import Like, Notification, Comment, UserFollowing

User = get_user_model()

@receiver(post_save, sender=User)
def create_profile_for_user(sender, instance=None, created=False, **kwargs):
    if created:
        UserProfile.objects.get_or_create(user=instance)

@receiver(post_save, sender=Like)
def create_new_notification_on_like(sender, instance, created, **kwargs):
    recipient = User.objects.get(username=instance.recommendation.owner)
    sender = instance.user.username

    if not recipient.username == sender: 
        Notification.objects.create(sender=sender, 
                            recipient=recipient, 
                            obj_id =instance.recommendation.id,
                            obj_name = "recommendation",
                            description="liked your recommendation ")

@receiver(post_save, sender=Comment)
def create_new_notification_on_comment(sender, instance, created, **kwargs):
    recipient = User.objects.get(username=instance.recommendation.owner)
    sender = instance.commenter.username

    # if there are commenters we need to create new notifications to them
    recipients = set(obj.commenter for obj in instance.recommendation.comments.all())
    recipients.add(recipient)
    
    for r in recipients:
        if not r.username == sender and not sender == instance.recommendation.owner: 
            print(r)
            Notification.objects.create(sender=sender, 
                                recipient=r, 
                                obj_id =instance.recommendation.id,
                                obj_name = "recommendation", 
                                description="commented on recommendation ")

@receiver(post_save, sender=UserFollowing)
def create_new_notification_on_follow(sender, instance, created, **kwargs):
    recipient = User.objects.get(pk=instance.following_user.id)
    
    Notification.objects.create(sender=instance.user.username, 
                        recipient=recipient, 
                        follow_obj_id =instance.id,
                        obj_name = "follow",
                        description="is now following you.")