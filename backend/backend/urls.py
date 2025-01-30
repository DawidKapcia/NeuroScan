from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, UserDetailView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

description = "Welcome to the NeuroScan API\n\nThis API provides essential functionality for user authentication and data management. Designed with REST principles, it enables seamless interaction with the system through standard HTTP methods such as GET, POST, PUT, and DELETE."

schema_view = get_schema_view(openapi.Info(title="NeuroScan API",
                                           default_version='v1',
                                           description=description,
                                           terms_of_service="https://www.google.com/policies/terms/",
                                           license=openapi.License(name="BSD License")), public=True, permission_classes=[permissions.AllowAny,])

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    
    path('api/user/', UserDetailView.as_view(), name='user-detail'),
    path('api/user/register/', CreateUserView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('api-auth/', include('rest_framework.urls')),

    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)