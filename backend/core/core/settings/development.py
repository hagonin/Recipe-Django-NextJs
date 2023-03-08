from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["127.0.0.1", "localhost"]
CSRF_TRUSTED_ORIGINS = ['http://*', 'https://*']

cloudinary.config(
    cloud_name=config('CLOUD_NAME_1'),
    api_key=config('CLOUD_API_KEY_1'),
    api_secret=config('CLOUD_API_SECRET_1')
)