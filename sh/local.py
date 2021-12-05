import os
import sys

from django.utils.translation import ugettext_lazy

from rdmo.core.settings import (AUTHENTICATION_BACKENDS, INSTALLED_APPS,
                                PROJECT_EXPORTS)

from . import BASE_DIR

VENDOR_CDN = False

DEFAULT_URI_PREFIX = 'https://localhost/rdmo/test'

# reference documents
EXPORT_REFERENCE_DOCX = '/home/rdmo/rdmo-app/reference.docx'
EXPORT_REFERENCE_ODT = '/home/rdmo/rdmo-app/reference.odt'

EXPORT_REFERENCE_ODT_VIEWS = {
    "https://rdmorganiser.github.io/terms/views/bielefeld": "/home/rdmo/rdmo-app/reference.odt"
}

EXPORT_REFERENCE_DOCX_VIEWS = {
    "https://rdmorganiser.github.io/terms/views/bielefeld": "/home/rdmo/rdmo-app/reference.docx"
}

'''
Theme, see also:
http://rdmo.readthedocs.io/en/latest/configuration/themes.html
'''
THEME_DIR = os.path.join(BASE_DIR, 'theme')

# ex- and import plugins
sys.path.append('/home/rdmo/rdmo-plugins')
PROJECT_EXPORTS.append(('madmp', ugettext_lazy('as madmp'), 'exports.madmp.MaDMPExport'))
PROJECT_EXPORTS.append(('datacite', ugettext_lazy('as datacite'), 'exports.datacite.DataCiteExport'))
PROJECT_EXPORTS.append(('radar', ugettext_lazy('as radar'), 'exports.radar.RadarExport'))
# PROJECT_IMPORTS.append(('xml', ugettext_lazy('from RDMP XML'), 'rdmo.projects.imports.RDMOXMLImport'))

# languages
LANGUAGE_CODE = 'de-de'
TIME_ZONE = 'Europe/Berlin'
LANGUAGES = (
    ('en', ugettext_lazy('English')),
    ('de', ugettext_lazy('German')),
    ('fr', ugettext_lazy('French')),
    ('it', ugettext_lazy('Italian')),
)

# enable auto save feature
PROJECT_QUESTIONS_AUTOSAVE = True

'''
Debug mode, don't use this in production
'''
DEBUG = True

'''
A secret key for a particular Django installation. This is used to provide
cryptographic signing, and should be set to a unique, unpredictable value.
'''
SECRET_KEY = 'this is not a very secret key'

'''
The list of URLs und which this application available
'''
ALLOWED_HOSTS = ['localhost', 'ip6-localhost', '0.0.0.0', '127.0.0.1', '[::1]', 'rdmo']

'''
The root url of your application, only needed when its not '/'
'''
# BASE_URL = '/path'

'''
Language code and time zone
'''
LANGUAGE_CODE = 'de-de'
TIME_ZONE = 'Europe/Berlin'

'''
The database connection to be used, see also:
http://rdmo.readthedocs.io/en/latest/configuration/databases.html
'''
# NOTE: using environment variables here that come from the docker
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ['POSTGRES_DB'],
        'USER': os.environ['POSTGRES_USER'],
        'PASSWORD': os.environ['POSTGRES_PASSWORD'],
        'HOST': os.environ['POSTGRES_HOST'],
        'PORT': os.environ['POSTGRES_PORT'],
    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': '',
#         'USER': '',
#         'PASSWORD': '',
#         'HOST': '',
#         'PORT': '',
#     }
# }

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': '',
#     }
# }

'''
E-Mail configuration, see also:
http://rdmo.readthedocs.io/en/latest/configuration/email.html
'''
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'localhost'
# EMAIL_PORT = '25'
# EMAIL_HOST_USER = ''
# EMAIL_HOST_PASSWORD = ''
# EMAIL_USE_TLS = False
# EMAIL_USE_SSL = False
# DEFAULT_FROM_EMAIL = ''

'''
Allauth configuration, see also:
http://rdmo.readthedocs.io/en/latest/configuration/authentication/allauth.html
'''


ACCOUNT = True
ACCOUNT_SIGNUP = True
ACCOUNT_TERMS_OF_USE = True
SOCIALACCOUNT = False

INSTALLED_APPS += [
    'allauth',
    'allauth.account',
#     'allauth.socialaccount',
#     'allauth.socialaccount.providers.facebook',
#     'allauth.socialaccount.providers.github',
#     'allauth.socialaccount.providers.google',
#     'allauth.socialaccount.providers.orcid',
#     'allauth.socialaccount.providers.twitter',
]

AUTHENTICATION_BACKENDS.append('allauth.account.auth_backends.AuthenticationBackend')

'''
LDAP, see also:
http://rdmo.readthedocs.io/en/latest/configuration/authentication/ldap.html
'''
# import ldap
# from django_auth_ldap.config import LDAPSearch
# from rdmo.core.settings import AUTHENTICATION_BACKENDS
#
# PROFILE_UPDATE = False
#
# AUTH_LDAP_SERVER_URI = "ldap://ldap.example.com"
# AUTH_LDAP_BIND_DN = "cn=admin,dc=ldap,dc=example,dc=com"
# AUTH_LDAP_BIND_PASSWORD = "admin"
# AUTH_LDAP_USER_SEARCH = LDAPSearch("dc=ldap,dc=example,dc=com", ldap.SCOPE_SUBTREE, "(uid=%(user)s)")
#
# AUTH_LDAP_USER_ATTR_MAP = {
#     "first_name": "givenName",
#     "last_name": "sn",
#     'email': 'mail'
# }
#
# AUTHENTICATION_BACKENDS.insert(
#     AUTHENTICATION_BACKENDS.index('django.contrib.auth.backends.ModelBackend'),
#     'django_auth_ldap.backend.LDAPBackend'
# )

'''
Shibboleth, see also:
http://rdmo.readthedocs.io/en/latest/configuration/authentication/shibboleth.html
'''
# from rdmo.core.settings import INSTALLED_APPS, AUTHENTICATION_BACKENDS, MIDDLEWARE_CLASSES
#
# SHIBBOLETH = True
# PROFILE_UPDATE = False
#
# INSTALLED_APPS += ['shibboleth']
#
# SHIBBOLETH_ATTRIBUTE_MAP = {
#     'uid': (True, 'username'),
#     'givenName': (True, 'first_name'),
#     'sn': (True, 'last_name'),
#     'mail': (True, 'email'),
# }
#
# AUTHENTICATION_BACKENDS.append('shibboleth.backends.ShibbolethRemoteUserBackend')
#
# MIDDLEWARE_CLASSES.insert(
#     MIDDLEWARE_CLASSES.index('django.contrib.auth.middleware.AuthenticationMiddleware') + 1,
#     'shibboleth.middleware.ShibbolethRemoteUserMiddleware'
# )
#
# LOGIN_URL = '/Shibboleth.sso/Login?target=/projects'
# LOGOUT_URL = '/Shibboleth.sso/Logout'

'''
Export Formats
'''
# from django.utils.translation import ugettext_lazy as _
# EXPORT_FORMATS = (
#     ('pdf', _('PDF')),
#     ('rtf', _('Rich Text Format')),
#     ('odt', _('Open Office')),
#     ('docx', _('Microsoft Office')),
#     ('html', _('HTML')),
#     ('markdown', _('Markdown')),
#     ('mediawiki', _('mediawiki')),
#     ('tex', _('LaTeX'))
# )

'''
Cache, see also:
http://rdmo.readthedocs.io/en/latest/configuration/cache.html
'''
# CACHES = {
#     'default': {
#         'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
#         'LOCATION': '127.0.0.1:11211',
#         'KEY_PREFIX': 'rdmo_default'
#     },
#     'api': {
#         'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
#         'LOCATION': '127.0.0.1:11211',
#         'KEY_PREFIX': 'rdmo_api'
#     },
# }

'''
LOGGING
'''
LOGGING_DIR = '/var/log/'
LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        },
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue'
        }
    },
    'formatters': {
        'default': {
            'format': '[%(asctime)s] %(levelname)s: %(message)s'
        },
        'name': {
            'format': '[%(asctime)s] %(levelname)s %(name)s: %(message)s'
        },
        'console': {
            'format': '[%(asctime)s] %(message)s'
        },
        'verbose': {
            'format': '%(asctime)s [%(levelname)s] %(filename)s %(lineno)d: %(message)s',
            'datefmt': '%H:%M:%S'
        },
        'fullverbose': {
            'format': '%(asctime)s [%(levelname)s] %(pathname)s %(lineno)d: %(message)s'
        },
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        },
        'error_log': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': os.path.join(LOGGING_DIR, 'rdmo_error.log'),
            'formatter': 'default'
        },
        'rdmo_log': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': os.path.join(LOGGING_DIR, 'rdmo.log'),
            'formatter': 'fullverbose'
        },
        'console': {
            'level': 'DEBUG',
            'filters': ['require_debug_true'],
            'class': 'logging.StreamHandler',
            'formatter': 'console'
        }
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
        },
        'django.request': {
            # 'handlers': ['mail_admins', 'error_log'],
            # 'level': 'ERROR',
            # 'propagate': True
            'handlers': ['console'],
            'level': 'ERROR',
        },
        'rdmo': {
            # 'handlers': ['rdmo_log'],
            # 'level': 'DEBUG',
            # 'propagate': False
            'handlers': ['console'],
            'level': 'DEBUG',
        }
    }
}
sys.path.append('/home/rdmo/ddp-app')
INSTALLED_APPS += [ 'ddp-app' ]
