# Using Capture Growth Charts { #capture_growth_charts } 

## About Capture Growth Charts { #about_capture_growth_charts } 

Capture growth charts is a web application that allows users to capture and view growth data for children under the age of 5. The application is designed to be used by health workers in the field to capture growth data for children and to view growth charts for children in their care. The application is designed to be used on a tablet or computer device and is optimized for data entry and visualization of growth charts for efficient monitoring of child development.

## Growth chart plugin upload

# Configuration { #configuration }
## Maintenance { #maintenance }

### Dataelement
Create data elements for **Weight**, **Height** and **Head circumference**.
Weight can be in either `gram` or `kg`, but height and head circumference should be in `cm`.
 <br />

### Program
#### Tracked entity attribute
Tracked entity attribues needed for the Growth chart plugin is `Date of birth` and `gender`. However, `First Name` and `Last Name` are also needed if you want the name to be printed when using the print function. <br /> <br />
                    
#### Tracked entity type
Tracked entity type for person needs the same attributes as the tracked entity attributes. <br />


#### Program     
##### Attributes
Select you preffered program for storing the growth variables and displaying the Growth Chart.
The program should have the following attributes:
- `First name`
- `Last name`
- `Date of birth`
- `Gender`
 <br />


##### Program stages
Select stage where growth variables currently are or will be stored.
The program stage should have the following data elements:
- `Weight` (g or kg)
- `Height` (cm)
- `Head circumference` (cm)
<br />                  
                         
## Datastore Manangement { #datastore_management }
### Capture
In namespace `capture`, enter the file with key `enrollmentOverviewLayout`
Add new section for the growth chart under `leftColumn`. You can choose where on the left column to place it. Add the following code, but remember to change out `<Url of instance>` with the url of your instance.
```json
{
    "source": "<Url of instance>/api/apps/capture-growth-chart/plugin.html",
    "type": "plugin"
}
```

### Capture-growth-chart
#### Config      
Create new namespace `capture-growth-chart` with key `config`
The growth chart plugin needs this config to work. All Id's should be changed, and will be specific for each implementation. The `femaleOptionCode` and `maleOptionCode` should map to the option codes used for gender. The structure of the config has to be the same as the one in the example below;
```json
    {
        "metadata": {
            "attributes": {
                "dateOfBirth": "AMl8BkN8Lyq",
                "gender": "tyNlJWNnEbs",
                "femaleOptionCode": "CGC_Female",
                "maleOptionCode": "CGC_Male"
            },
            "dataElements": {
                "headCircumference": "GfchA70xtmP",
                "height": "wWCSulSdUgd",
                "weight": "yZwKJdYXTZF"
            },
            "program": {
                "programStageId": "h3gT08Et4sC"
            }
        },
        "settings": {
            "customReferences": false,
            "defaultStandard": "ID",
            "weightInGrams": false
        }
    }
```    
<br />

#### Custom references
##### Create custom references
1. Create a new key in the `capture-growth-chart` namespace with the key `customReferences`
2. Add the custom references you want to use. The structure of the custom references has to be the same as the one in the example below. But the **datasetValues** should be changed to fit your own references.
```json
{
    "hcfa_b": {
        "categoryMetadata": {
            "gender": "Boy",
            "label": "Head circumference for age"
        },
        "datasets": {
            "0 to 13 weeks": {
                "datasetValues": [
                    {
                        "SD0": 34.5,
                        "SD1": 35.7,
                        "SD1neg": 33.2,
                        "SD2": 37,
                        "SD2neg": 31.9,
                        "SD3": 38.3,
                        "SD3neg": 30.7
                    },
                    // ... more data points ...
                ],
                "metadata": {
                    "chartLabel": "0 to 13 weeks",
                    "range": {
                        "end": 13,
                        "start": 0
                    },
                    "xAxisLabel": "Weeks",
                    "yAxisLabel": "Head circumference (cm)"
                }
            },
            "0 to 5 years": {
                "datasetValues": [
                    {
                        "SD0": 34.5,
                        "SD1": 35.7,
                        "SD1neg": 33.2,
                        "SD2": 37,
                        "SD2neg": 31.9,
                        "SD3": 38.3,
                        "SD3neg": 30.7
                    },
                    // ... more data points ...
                ],
                "metadata": {
                    "chartLabel": "0 to 5 years",
                    "range": {
                        "end": 5,
                        "start": 0
                    },
                    "xAxisLabel": "Years",
                    "yAxisLabel": "Head circumference (cm)"
                }
            }
        }
    }
}
```
<br />

##### Use custom references

If you want to use custom references, you can set `customReferences` to `true` in the config. This will make the plugin use the custom references you have created. If you want to use the default references, you can set `customReferences` to `false` in the config. This will make the plugin use the WHO references. <br /> 

