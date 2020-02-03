
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_framework.permissions import (
	AllowAny
)


from v1.accounts.serializers import (
	UserCreateSerializer,
	UserSerializer,
)


User=get_user_model()

class UserCreateView(CreateAPIView):
	queryset = User.objects.all()
	serializer_class = UserCreateSerializer
	permission_classes = (AllowAny, )


def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }



class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
