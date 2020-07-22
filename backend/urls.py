from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from rest_framework import routers
from user_profile import views as up_views                                
from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register('user', up_views.UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/<username>/', up_views.CustomUserDetailView.as_view(), name="user_detail_view" ),
    path('recommendations/<owner>/', up_views.RecommendationRetrieveView.as_view(), name="retrieve_recommendations"),
    path('create/recommendations/<owner>/', up_views.RecommendationCreateView.as_view(), name="create_recommendations"),
    path('delete/recommendation/<int:pk>/', up_views.RecommendationDetailView.as_view(), name="delete_recommendation"),
    path('update/recommendation/<int:pk>/', up_views.RecommendationUpdateView.as_view(), name="delete_recommendation"),
    path('follow/<int:user_id>/<int:following_user_id>/', up_views.AddNewFollowerCreateView.as_view(), name="add_new_follower"),
    path('unfollow/<int:user>/<int:following_user>/', up_views.DeleteFollowersDestroyView.as_view(), name="unfollow_user"),
    path('api/<str:username>/followers/', up_views.UserFollowersListView.as_view(),name="user_followers"),
    path('api/<str:username>/following/', up_views.UserFollowingListView.as_view(),name="user_following"),
    path('home-recommendations/<int:pk>/', up_views.HomeRecommendationsView.as_view(), name="all_following_recommendations"),
    path('api/<str:username>/recommendations/<int:pk>/', up_views.RecommendationDetailView.as_view() , name="recommendation_detail"),
    path('create/new/comment/',up_views.CommentCreateView.as_view(), name="create_new_Comment"),
    path('like/recommendation/<int:pk>/', up_views.LikeRecommendationCreateView.as_view(), name="like_a_recommendation"),
    path('unlike/recommendation/<int:user>/<int:recommendation>/', up_views.UnlikeRecommendationView.as_view(), name="unlike_a_recommendation"),
    path('all/likes/<str:username>/',up_views.AllUserLikesView.as_view(),name="all_user_likes"),
    path('search/people/<str:word_to_search>/',up_views.SearchPeopleRetrieveView.as_view(), name="search_people_view"),
    path('search/hashtag/<str:word_to_search>/',up_views.SearchHashtagRetrieveView.as_view(), name="search_hashtag_view"),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('account/', include('allauth.urls')),
    path('api/notifications/<int:pk>/', up_views.NotificationsListView.as_view(), name='notifications'),
    path('new-notifications-count/<int:pk>/',up_views.get_new_notifications_count, name="new_notifications_count"),
    path('mark/notifications/seen/<int:pk>/', up_views.mark_notifications_as_seen , name="mark_notifications_seen"),
    path('delete/user-account/<int:pk>/<password>/',up_views.delete_account_view, name="delete_account"),
    path('', include('django.contrib.auth.urls')),
    re_path('', TemplateView.as_view(template_name='index.html')),
]

urlpatterns += router.urls

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

