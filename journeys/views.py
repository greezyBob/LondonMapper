from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status # status has a list of status codes we can use in our Response
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied


from .models import Journey
from .serializers.common import JourneySerializer

from rest_framework.permissions import IsAuthenticated

# Create your views here.
class JourneyListView(APIView):
  permission_classes = (IsAuthenticated, )

  def get(self, request):
    journeys = Journey.objects.filter(owner=request.user.id)
    serialized_journeys = JourneySerializer(journeys, many=True)
    return Response(serialized_journeys.data, status=status.HTTP_200_OK)

  def post(self, request):
    request.data['owner'] = request.user.id
    journey_to_add = JourneySerializer(data=request.data)
    try:
      journey_to_add.is_valid(True)
      journey_to_add.save()
      return Response(journey_to_add.data, status=status.HTTP_201_CREATED)
    except ValidationError:
      return Response(journey_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    except Exception as e:
      return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)


class JourneyDetailedView(APIView):

  def get_journey(self, pk):
    try:
      return Journey.objects.get(pk=pk)
    except Journey.DoesNotExist as e:
      raise NotFound({ 'detail': str(e) })

  def delete(self, request, pk):
      journey_to_delete = self.get_journey(pk)
      if journey_to_delete.owner != request.user:
        raise PermissionDenied()
      journey_to_delete.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)
