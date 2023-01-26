from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import CustomUser, Profile

class ProfileInLine(admin.StackedInline):
    model = Profile
    can_delete = False 
    verbose_name_plural = "Profile"

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm

    model = CustomUser

    list_display = (
        "username","email", "is_active","is_staff","is_superuser", "last_login",
    )
    list_filter = ("is_active", "is_staff", "is_superuser")
    fieldsets= (
        (None, {"fields": ("username","email", "password")}),
        (
            "Permission",
            {
                "fields": ("is_staff", "is_active", "is_superuser", "user_permissions",)
            }
        ),
        ("Dates", {"fields": ("last_login", "date_joined")})
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "email",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_active",
                ),
            },
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)
    inlines = (ProfileInLine,)
    
