from django.urls import path
from .views import JourneyListView, JourneyDetailedView

urlpatterns = [
  path('', JourneyListView.as_view()),
  path('<int:pk>/', JourneyDetailedView.as_view())
]