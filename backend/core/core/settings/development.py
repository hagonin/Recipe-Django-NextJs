from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True


cloudinary.config(
    cloud_name=config('CLOUD_NAME_1'),
    api_key=config('CLOUD_API_KEY_1'),
    api_secret=config('CLOUD_API_SECRET_1')
)

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

ALLOWED_HOSTS = ["localhost", "127.0.0.1"]
