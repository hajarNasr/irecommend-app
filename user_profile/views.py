from django.contrib.auth import get_user_model
from user_profile import serializers as up_serializers
from rest_framework import viewsets, generics, pagination
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .models import Recommendation, UserFollowing, Comment, Hashtag, Like, Notification
from django.contrib.auth.hashers import make_password

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = up_serializers.UserSerializer

class CustomUserDetailView(generics.RetrieveAPIView): 
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = up_serializers.UserSerializer
    lookup_field = 'username'

class RecommendationRetrieveView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    pagination_class = pagination.LimitOffsetPagination
    
    def get(self, request, owner): 
        user = User.objects.filter(username=owner)[0]
        recommendations = Recommendation.objects.filter(owner_id=user.id)  
        serializer = self.paginate_queryset(up_serializers.RecommendationSerializer(recommendations, many=True,
                                                                    context={'request':request}).data)
        return self.get_paginated_response(serializer)  
    
class RecommendationCreateView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = up_serializers.RecommendationSerializer
    queryset = Recommendation.objects.all()

class RecommendationUpdateView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = up_serializers.RecommendationSerializer
    queryset = Recommendation.objects.all()

class AddNewFollowerCreateView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = up_serializers.UserFollowingSerializer
    queryset = UserFollowing.objects.all()

class DeleteFollowersDestroyView(generics.DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = up_serializers.UnfollowUserSerializer
    queryset = UserFollowing.objects.all()  

    def delete(self, request, user, following_user):
        following_recored = UserFollowing.objects.filter(user=user, 
                                                         following_user=following_user)
        if following_recored:
            Notification.objects.get(sender=User.objects.get(id=user).username, 
                                     follow_obj_id= following_recored[0].id,
                                     recipient=User.objects.get(id=following_user)).delete()
            following_recored.delete()                         

        return Response([])


class UserFollowersListView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()

    def get(self, request, username):
        user = User.objects.get(username=username)
        followers = [User.objects.get(pk=follower.user.id)
                        for follower in
                            user.followers.all()]
     
        serializer = up_serializers.MiniUserSerializer(followers, many=True)
        return Response(serializer.data)    

class UserFollowingListView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    
    def get(self, request, username):
        user = User.objects.get(username=username)

        following_users = [User.objects.get(pk=following.following_user.id)
                               for following in 
                                   user.following.all()]
      
        serializer = up_serializers.MiniUserSerializer(following_users, many=True)
        return Response(serializer.data)

class AllUserLikesView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    pagination_class = pagination.LimitOffsetPagination 

    def get(self, request, username):
        user = User.objects.get(username=username)
        user_likes = user.likes.all()

        recommendations = [Recommendation.objects.get(id=user_like.recommendation.id) 
                            for user_like in user_likes][::-1]

        serializer = self.paginate_queryset(up_serializers.RecommendationSerializer(recommendations, many=True,
                                                                    context={'request':request}).data)
        
        return self.get_paginated_response(serializer)                    

         

class HomeRecommendationsView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    pagination_class = pagination.LimitOffsetPagination 

    def get(self, request, pk):                         
        current_user = User.objects.get(pk=pk)
        recommendations = list(current_user.recommendations.all())

        for following_user_recored in current_user.following.all():
            following_user = User.objects.get(pk=following_user_recored.following_user.id)  
            recommendations += following_user.recommendations.all()      

        recommendations = sorted(recommendations, key=lambda obj:obj.id)[::-1]
                                                    
        serializer = self.paginate_queryset(up_serializers.RecommendationSerializer(recommendations, many=True,
                                                                    context={'request':request}).data)
        
        return self.get_paginated_response(serializer)    


class RecommendationDetailView(generics.RetrieveDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Recommendation.objects.all()
    serializer_class = up_serializers.RecommendationsWithOwnerAndCommentsSerializer

    def get_context_data(self, **kwargs):
        context = super(RecommendationDetailView, self).get_context_data(**kwargs)
        context['request'] = self.request
        return context

    def delete(self, request, pk):
        notifications = Notification.objects.filter(obj_id=pk)
        for notification in notifications:
            notification.delete()

        Recommendation.objects.get(pk=pk).delete()    
   
        return Response([])    


class CommentCreateView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = up_serializers.CommentSerializer
    queryset = Comment.objects.all()

class LikeRecommendationCreateView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = up_serializers.LikeRecommendationSerializer
    queryset = Like.objects.all()

class UnlikeRecommendationView(generics.DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = up_serializers.LikeRecommendationSerializer
   
    def delete(self, request, user, recommendation):
        Like.objects.get(user=user, recommendation=recommendation).delete()
        try:
            Notification.objects.get(sender=User.objects.get(pk=user).username, 
                                        obj_id=recommendation).delete()
        except:
            pass                                

        return Response([])
        
    
class SearchPeopleRetrieveView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, word_to_search):
        try:
            users = User.objects.filter(username__icontains=word_to_search)
            serializer = up_serializers.MiniUserSerializer(users, many=True)
            return Response(serializer.data)
        except:
            return Response([])


class SearchHashtagRetrieveView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    pagination_class = pagination.LimitOffsetPagination

    def get(self, request, word_to_search):
        try:
           hashtag = Hashtag.objects.get(name=word_to_search)
           recommendations = Recommendation.objects.filter(hashtags=hashtag.id)
           serializer = self.paginate_queryset(up_serializers.RecommendationSerializer(recommendations, many=True,
                                                                    context={'request':request}).data)
        
           return self.get_paginated_response(serializer)
        except:
            return JsonResponse({"count":0})


class NotificationsListView(generics.ListAPIView):  
    permission_classes = (IsAuthenticated,)
    #serializer_class = up_serializers.NotificationSerializer
    pagination_class = pagination.LimitOffsetPagination
    #queryset = Notification.objects.all()
    def get(self, request, pk):
        notifications = Notification.objects.filter(recipient=pk)
        serializer = self.paginate_queryset(up_serializers.NotificationSerializer(notifications, many=True,
                                                                    context={'request':request}).data)
        
        return self.get_paginated_response(serializer)  

def mark_notifications_as_seen(request, pk):
    user = User.objects.filter(pk=pk)
    for notifi in Notification.objects.filter(recipient=pk, seen=False):
        notifi.seen = True
        notifi.save()

    return HttpResponse(None)

def get_new_notifications_count(request, pk):
    user = User.objects.get(pk=pk)

    notifications_count = Notification.objects.filter(recipient=user, seen=False).count()

    return JsonResponse({"count": notifications_count})
      
def delete_account_view(request, pk, password):
    user = User.objects.filter(pk=pk)
    if user:
        user = user[0]
        if user.check_password(password):
            Notification.objects.filter(sender=user.username).delete()
            user.delete()   
            return JsonResponse({"user deleted":True})
        else:
            return HttpResponse("Wrong password")  
  