from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
  def has_object_permission(self, request, view, obj):
    if request.method in permissions.SAFE_METHODS:
      return obj.created_by == request.user


class IsCreator(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        auth0_user_id = get_auth0_user_id_from_request(request)
        return obj.created_by == auth0_user_id
