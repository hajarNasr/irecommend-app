from rest_framework import serializers
from .models import Recommendation, UserFollowing, UserProfile, Comment, Like, Hashtag, Notification
from rest_auth.serializers import UserDetailsSerializer
from datetime import datetime
from .checkImgSize import img_size
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(UserDetailsSerializer):
    full_name = serializers.CharField(source="userprofile.full_name", allow_blank=True, required=False)
    about     = serializers.CharField(source="userprofile.about",     allow_blank=True, required=False)
    location  = serializers.CharField(source="userprofile.location",     allow_blank=True, required=False)
    website   = serializers.URLField (source="userprofile.website",   allow_blank=True, required=False)
    profile_img = serializers.ImageField(source="userprofile.profile_img", use_url=True, validators=[img_size])
    header_img = serializers.ImageField(source="userprofile.header_img",   use_url=True, validators=[img_size])
    following_count = serializers.SerializerMethodField()
    followers_count = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()

    def get_is_following(self, obj):
        requestUser = self.context['request'].user
        return obj.followers.filter(user=requestUser.id).count() == 1

    def get_following_count(self, obj):
        return obj.following.all().count()

    def get_followers_count(self, obj):
        return obj.followers.all().count() 

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ("full_name", "about", "website",
                                                      "profile_img", "header_img", "location",
                                                       "following_count", "followers_count",
                                                         "is_following")                                             

    def update(self, instance, validated_data):
        profile_data = validated_data.pop("userprofile", {})
        full_name = profile_data.get("full_name")
        email     = profile_data.get("email")
        about     = profile_data.get('about')
        website   = profile_data.get('website')
        location = profile_data.get('location')
        profile_img = profile_data.get('profile_img')
        header_img = profile_data.get('header_img')

        instance = super(UserSerializer, self).update(instance, validated_data)

        profile = instance.userprofile
        if profile_data:
            if full_name:
                profile.full_name = full_name   
            if about:
                profile.about = about
            if location:
                profile.location = location    
            if website:
                profile.website = website
            if profile_img:
                profile.profile_img = profile_img  
            if header_img:
                profile.header_img = header_img     
            if email:
                profile.email = email   
            profile.save()
        return instance             

  


class UserFollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = '__all__'

    def create(self, validated_data):
        #notficication for the followers here
        return UserFollowing.objects.create(**validated_data)   


class FollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = ("id","following_user", "created")

class FollowersSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = ("id", "user", "created")


class UnfollowUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = '__all__'

class MiniUserSerializer(UserDetailsSerializer):
    full_name = serializers.CharField(source="userprofile.full_name", allow_blank=True, required=False)
    profile_img = serializers.ImageField(source="userprofile.profile_img", use_url=True, validators=[img_size])

    class Meta(UserDetailsSerializer.Meta):
        fields = ("pk","username","full_name", "profile_img")


class TagsListField(serializers.ListField): 
    child = serializers.CharField()

    def to_representation(self, data):
        return data.values_list('name', flat=True)

class RecommendationSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    hashtags = TagsListField(required=False, child=serializers.CharField(allow_blank=True))

    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    def create(self, validated_data):
        hashtags = validated_data.pop('hashtags')
        instance = super(RecommendationSerializer, self).create(validated_data)
        for hashtag in hashtags:
            tag, created = Hashtag.objects.get_or_create(name=hashtag)
            instance.hashtags.add(tag)
            #create notification here
        return instance

    def update(self, instance, validated_data):
        hashtags = validated_data.pop('hashtags')[0].split(",") 
        instance = super(RecommendationSerializer, self).update(instance, validated_data)

        instance.hashtags.all().delete()

        for hashtag in hashtags:
            tag, created = Hashtag.objects.get_or_create(name=hashtag)
            instance.hashtags.add(tag) 

        return instance   
   

    def get_user(self, obj):
        return MiniUserSerializer(User.objects.get(id=obj.owner_id)).data

    def get_comments_count(self, obj):  
        return obj.comments.all().count()   

    def get_likes_count(self, obj):
        return obj.likes.all().count()

    def get_is_liked(self, obj): 
        requestUser = self.context['request'].user
        return obj.likes.filter(user=requestUser.id).count() == 1

    class Meta:
        model  = Recommendation
        fields = '__all__' 

class RecommendationsWithOwnerAndCommentsSerializer(serializers.ModelSerializer):
    recommendation = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    def get_recommendation(self, obj):
        context = self.context
        return RecommendationSerializer(Recommendation.objects.get(id=obj.id), context=context).data

    def get_comments(self, obj):
        return CommentSerializer(obj.comments.all(), many=True).data


    class Meta:
        model  = Recommendation
        fields = ('recommendation', "comments")  


class CommentSerializer(serializers.ModelSerializer):
     commenter = serializers.SerializerMethodField()

     def get_commenter(self, obj):
         return MiniUserSerializer(User.objects.get(pk=obj.commenter.id)).data

     def create(self, validated_data):
        validated_data['commenter'] = self.context['request'].user
        # notification here for the owner
        return super(CommentSerializer, self).create(validated_data)

     class Meta:
        model  = Comment
        fields = '__all__' 

class LikeRecommendationSerializer(serializers.ModelSerializer): 
    class Meta:
       model  = Like
       fields = '__all__'    

class RecomendationContentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    def get_user(self, obj):
        return MiniUserSerializer(User.objects.get(id=obj.owner_id)).data
        
    class Meta:
        model = Recommendation
        fields = ['id','content', 'user']

class NotificationSerializer(serializers.ModelSerializer):
    recommendation = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    def update(self, request, *args, **keywargs):
        print(request)

    def get_recommendation(self, obj):
        if obj.obj_name == 'recommendation':
            return RecomendationContentSerializer(Recommendation.objects.get(id=obj.obj_id)).data

        return None    

    def get_user(self, obj):
        return MiniUserSerializer(User.objects.get(username=obj.sender)).data        

    class Meta:
        model = Notification
        fields = ('id','user', 'description', 'created_at', 'recommendation', 'seen')


