
from .serializers import DocumentSerializer
from .models import Document
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
# Create your views here.

class DocumentViewGetPost(APIView):
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

class DocumentViewUpdateDelete(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def delete(self, request, *args, **kwargs):
        #delete by id
        Documents = Document.objects.get(pk=kwargs['pk'])
        #catch if document does not exist
        #now delete from filesystem
        Documents.file.delete()
        Documents.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def patch(self, request, *args, **kwargs):
        #update by id and remove old file and replace with new one
        Documents = Document.objects.get(pk=kwargs['pk'])
        Documents_serializer = DocumentSerializer(Documents, data=request.data, partial=True)
        #prevent MultiValueDictKeyError exception
        if 'file' in request.data:
            Documents.file.delete()
        
        if Documents_serializer.is_valid():
            Documents_serializer.save()
            return Response(Documents_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', Documents_serializer.errors)
            return Response(Documents_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
