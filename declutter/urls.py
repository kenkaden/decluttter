from django.conf.urls import patterns, include, url
from django.contrib import admin
import appuser.urls as user_urls

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'declutter.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^api/v1/appuser/', include(user_urls)),
    url(r'^admin/', include(admin.site.urls)),
)
