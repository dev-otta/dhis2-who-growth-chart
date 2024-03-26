# Using Capture Growth Charts { #capture_growth_charts } 

## About Capture Growth Charts { #about_capture_growth_charts } 

Capture growth charts is a web application that allows users to capture and view growth data for children under the age of 5. The application is designed to be used by health workers to capture growth data for children and to view growth charts for children in their care. The application is designed to be used on a tablet or computer device and is optimized for data entry and visualization of growth charts for efficient monitoring of child development.

# Plugin Implementation { #implement_plugin }
Plugins allows developers to extend the functionality on DHIS2. These plugins enable users to customize form fields and sections within the Capture app, potentially enhancing data entry and user experience. The Growth Chart is using the plugin functionality to be implemented in the Capture app.

## Prerequisites { #prerequisites }
- DHIS2 version 2.38 or later
- Capture app version v100.53.0 or later (Can be updated in the **App Management** app).
- Access to the Datastore Management app.
- Access to the App Management app.

## Implementation { #implementation }
### Datastore Management app
The plugin is implemented using the Datastore Management app.

#### capture namespace
- Create a new namespace with the key `capture` and key `useNewDashboard`.
    - Add the following code to the namespace. Make sure to change `programId` to the id of the program you want to use the plugin for.
    ```json
    {
        "<programId>": true
    }
    ```

- Create a new key `enrollmentOverviewLayout` in the `capture` namespace.
    - Add the following code to the key. This will be the new layout for the Capture app. Again, change the `programId` Make sure to change the contents of `leftColumn` and `rightColumn` to fit your needs.
    ```json
    {
        "<programId>": {
            "leftColumn": [
                {
                    "name": "QuickActions",
                    "type": "component"
                },
                {
                    "name": "StagesAndEvents",
                    "type": "component"
                }
            ],
            "rightColumn": [
                {
                    "name": "TrackedEntityRelationship",
                    "type": "component"
                },
                {
                    "name": "ErrorWidget",
                    "type": "component"
                },
                {
                    "name": "WarningWidget",
                    "type": "component"
                },
                {
                    "name": "FeedbackWidget",
                    "type": "component"
                },
                {
                    "name": "IndicatorWidget",
                    "type": "component"
                },
                {
                    "name": "Notes",
                    "type": "component"
                },
                {
                    "name": "ProfileWidget",
                    "settings": {
                    "readOnlyMode": true
                    },
                    "type": "component"
                },
                {
                    "name": "EnrollmentWidget",
                    "settings": {
                    "readOnlyMode": false
                    },
                    "type": "component"
                }
            ],
            "title": "Growth Monitoring"
        }
    }
    ```

# Growth chart plugin upload
Run `yarn build` in the root of the project to build the plugin. The build can then be found in `/build/bundle`, and is a compressed file (`.zip`).

Upload the compressed file to the DHIS2 instance using the `manuall install` funciton in the **App Management** app. Now the plugin should be an available app on the instance and you can find it on this url: 
- `<Url of instance>/api/apps/capture-growth-chart/plugin.html` 

Make sure to alter `<Url of instance>` with the actual url of you instance.

# Configuration { #configuration }
## Maintenance app { #maintenance }
The following steps can be made in the **Maintenance** app on DHIS2.

### Data element
Data elements needed to support full functionality in for the growth chart are; **Weight**, **Height** and **Head circumference**. **Weight** can be in either `gram` or `kg`, but **Height** and **Head circumference** should be in `cm`. If one of the data elements are missing, growth charts using that data element will not be displayed.  

### Program
#### Tracked entity attribute
Tracked entity attribues needed for the Growth chart plugin is `Date of birth` and `Gender`. 

**Tip**
`First Name` and `Last Name` are also utilized in additional functionality, but not necessary for using the growth chart itself.  
                    
#### Tracked entity type
Navigate to the tracked entity type for **Person**. This type needs to be assigned the same attributes as those created in the [Tracked Entity Attributes](#tracked-entity-attributes) step. Make sure `Display in list` for the attributes is active, like the image below. 
![Tracked entity type](resources/images/tracked_entity_type_attributes.png)  

#### Program     
Select you preffered program for storing the growth variables and displaying the Growth Chart. 
##### Attributes
The program should have the following attributes:
- `First name`
- `Last name`
- `Date of birth`
- `Gender`
 

##### Program stages
Select stage where growth variables currently are or will be stored.
The program stage should have the following data elements:
- `Weight` (g or kg)
- `Height` (cm)
- `Head circumference` (cm)
                
                         
## Datastore Manangement app { #datastore_management }
### Capture namespace
In namespace `capture`, enter the file with key `enrollmentOverviewLayout`
Add new section for the growth chart under `leftColumn`. You can choose where on the left column to place it. Add the following code, but remember to change out `<Url of instance>` with the url of your instance.
```json
{
    "source": "<Url of instance>/api/apps/capture-growth-chart/plugin.html",
    "type": "plugin"
}
```

### Capture-growth-chart namespace
#### Config      
Create new namespace `capture-growth-chart` with key `config`
The growth chart plugin needs this config to work. Keep in mind that all Id's should be changed, and will be specific for each implementation. 

##### Metadata
The `metadata` object contains the following keys:
- `attributes` - Contains the attribute IDs for `dateOfBirth`, `gender`, `firstName`, `lastName`, `femaleOptionCode` and `maleOptionCode`. All of these attribute IDs can be found in the **Maintenance** app under **Tracked entity attributes**, except for the `femaleOptionCode` and `maleOptionCode` which can be found in `Option set` under **Other** in the **Maintenance** app. 
- `dataElements` - Contains the data element IDs for `headCircumference`, `height` and `weight`. All of these data element IDs can be found in the **Maintenance** app under **Data elements**.
- `program` - Contains the program stage ID for the program stage where the growth data is stored. This ID can be found in the **Maintenance** app under **Programs** and **Program stages**.

##### Settings
The `settings` object contains the following keys:
- `usePercentiles` - A boolean value that determines if the growth chart should use percentiles or z-scores. If `true`, the growth chart will use percentiles. If `false`, the growth chart will use z-scores
- `weightInGrams` - A boolean value that determines if the weight should be in grams or kg. 

The structure of the config has to be the same as the one in the example below;
```json
{
    "metadata": {
        "attributes": {
            "dateOfBirth": "AMl8BkN8Lyq",
            "gender": "tyNlJWNnEbs",
            "firstName": "Sx5Gd4JfPrL",
            "lastName": "sljlq9XtqaA",
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
        "usePercentiles": false,
        "weightInGrams": false
    }
}
```    

#### Custom references (Future functionality)
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


##### Use custom references

Now you can set `customReferences` to `true` in the config. This will make the plugin use the custom references you have created. If you want to use the default references, you can set `customReferences` to `false` in the config. This will make the plugin use the WHO references.