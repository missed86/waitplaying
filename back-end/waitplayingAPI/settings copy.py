"""
Django settings for waitplayingAPI project.

Generated by 'django-admin startproject' using Django 4.1.5.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-(7g#_k8df@rl&4e3@c9%6%!9-sq^f8ft=1k3s5rbb*19(_yo-m"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True


ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1"
]

if not DEBUG:
    ALLOWED_HOSTS = [
        "www.waitplaying.com",
        ".waitplaying.com",
        "waitplaying.com",
    ]


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "api.apps.ApiConfig",
    "rest_framework",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsHeadersMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhitenoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "waitplayingAPI.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "build"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "waitplayingAPI.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000"
    "http://localhost:8000"
]


CSRF_TRUSTED_ORIGINS = [
    "https://localhost:3000"
    "https://localhost:8000"
]

if not DEBUG:
    CORS_ORIGIN_WHITELIST = [
        "https://waitplaying.com"
        "https://www.waitplaying.com"
    ]

    CSRF_TRUSTED_ORIGINS = [
        "https://waitplaying.com"
        "https://www.waitplaying.com"
    ]

# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

# STATIC_ROOT = BASE_DIR / 'static'
STATIC_URL = "static/"
STATICFILES_DIRS = [
    BASE_DIR / "build/assets",
]


# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# REST_FRAMEWORK = {
#     'DEFAULT_PERMISSION_CLASSES': [
#         'rest_framework.permissions.AllowAny'
#     ],
#     'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
#     'PAGE_SIZE': 16,
# }

# AUTHENTICATION_BACKENDS = (
#     'django.contrib.auth.backends.ModelBackend',
# )
