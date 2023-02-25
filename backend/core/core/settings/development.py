from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('true', default=True, cast=bool)

ALLOWED_HOSTS = []

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')