from pint import UnitRegistry
from django.core.exceptions import ValidationError
from pint.errors import UndefinedUnitError

valid_unit_measurements = ['pounds', 'lbs', 'oz', 'g', 'kg', 'cup', 'teaspoon','tablespoon']

def validate_unit_of_measure(value):
    ureg = UnitRegistry()
    try:
        single_unit = ureg[value.lower()]
    except UndefinedUnitError as e:
        raise ValidationError(f"'{value}' is not a valid unit of measure")
    except:
        raise ValidationError(f"'{value}' is invalid. Unknown error.")