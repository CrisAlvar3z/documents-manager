from django.db import models

class Document(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(blank=True, max_length=255)
    file = models.FileField(upload_to='documents/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # user = models.ForeignKey('auth.User', related_name='documents', on_delete=models.CASCADE)

    def __str__(self):
        return self.name