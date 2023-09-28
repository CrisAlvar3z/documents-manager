#!/bin/bash
export DJANGO_SUPERUSER_USERNAME="admin"
export DJANGO_SUPERUSER_PASSWORD="admin"
export DJANGO_SUPERUSER_EMAIL="admin@admin.com"

echo "Create migrations"
python manage.py makemigrations
echo "=================================="

echo "Migrate"
python manage.py migrate
echo "=================================="

echo "Init Admin"
python manage.py createsuperuser --noinput --username $DJANGO_SUPERUSER_USERNAME --email $DJANGO_SUPERUSER_EMAIL
echo "=================================="

echo "Start server" 
python manage.py runserver 0.0.0.0:8000