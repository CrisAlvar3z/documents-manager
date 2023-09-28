from .serializers import DocumentSerializer
from .models import Document
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

class DocumentView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        Documents = Document.objects.all()
        serializer = DocumentSerializer(Documents, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        Documents_serializer = DocumentSerializer(data=request.data)
        if Documents_serializer.is_valid():
            Documents_serializer.save()
            return Response(Documents_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', Documents_serializer.errors)
            return Response(Documents_serializer.errors, status=status.HTTP_400_BAD_REQUEST)