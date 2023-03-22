try:
    from .local_settings  import *
except:
    from .prod_settings  import *