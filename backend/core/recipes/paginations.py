from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
import math


class RecipeCustomPagination(PageNumberPagination):
    page_size = 20 # default page size
    max_page_size = 50 # default max page size
    page_size_query_param = 'p' 
    
    def get_paginated_response(self, data):
        if self.request.query_params.get('p'):
            self.page_size = int(self.request.query_params.get('p'))
            
        # Count total page from request by total and page_size
        total_page = math.ceil(self.page.paginator.count / self.page_size)
        
        return Response({
            'page_size': self.page_size,
            'count': self.page.paginator.count,
            'total_pages': total_page,
            'current_page_number': self.page.number,
            'previous': self.get_previous_link(),
            'next': self.get_next_link(),
            'results': data
        })