# Implementation Guide for Growth Chart Plug-in

## Maintenance


### Other Configuration
Head to `Other` in Maintenance. 
Create a new `Option Set` with the following input in `PRIMARY DETAILS` and `OPTIONS`:
- PRIMARY DETAILS:
  - Name: `gender`
  - Code: `CGC_Gender`
- OPTIONS:
  - Option 1
    - Name: `Male`
    - Code: `CGC_Male`
  - Option 2
    - Name: `Female`
    - Code: `CGC_Female`
<br />
<br />
<br />
<br />

### Program Configuration
Head to `Program` in Maintenance.
Head to `Tracked entity attribute`. <br />
*Tracked entity attribues needed are `Date of birth`, `First Name` and `Last Name`*. <br /> <br />
Create a new `Tracked entity attribute` for `Gender` (Do this even if it exists from before):


    - Program configuration
        - Tracked entity attribute
            - Create tracked entity attribute for `Date of birth`
                - Name: `Date of birth`
                - Short name: `DoB`
                - Code: `CGC_DoB`
                - Value type: `Date`
            
            - Create tracked entity attribute for `First name`
                - Name: `First name`
                - Short name: `CCG_FirstName`
                - Code: `CGC_FirstName`
                - Value type: `Text`

            - Create tracked entity attribute for `Last name`
                - Name: `Last name`
                - Short name: `CCG_LastName`
                - Code: `CGC_LastName`
                - Value type: `Text`
                
            - Create tracked entity attribute for `Gender`
                - Name: `Gender`
                - Short name: `CCG_Gender`
                - Code: `CGC_Gender`
                - Option set: `gender`
                    
        - Tracked entity type
            - Person needs following attributes
                - `First name`
                - `Last name`
                - `Date of birth`
                - `Gender`
                
        - Program
            - Select preferred program
                - Attributes needed
                    - `First name`
                    - `Last name`
                    - `Date of birth`
                    - `Gender`
                    
                - Program stages
                    - Select program stage for growht variables
                        - Data elements
                            - `Weight` (g or kg)
                            - `Height` (cm)
                            - `Head circumference` (cm)
                            - `Report data` (added by default)
                            



- Growth chart plugin upload

- Data element
    - Create data element for `Weight`, can be in `g` or `kg`
        - Name: `Weight`
        - Short name: `CGC_Weight`
        - Code: `CGC_Weight`
        - Domain type: `Tracker`
        - Value type: `Number`
        - Aggregation type: `Avergae`
    
    - Create data element for `Height`, can be in `cm`
        - Name: `Height`
        - Short name: `CGC_Height`
        - Code: `CGC_Height`
        - Domain type: `Tracker`
        - Value type: `Number`
        - Aggregation type: `Avergae`

    - Create data element for `Head circumference`, can be in `cm`
        - Name: `Head circumference`
        - Short name: `CGC_HeadCircumference`
        - Code: `CGC_HeadCircumference`
        - Domain type: `Tracker`
        - Value type: `Number`
        - Aggregation type: `Avergae`

- Maintenance
    - Other
        - Option set
            - Create option set for `gender`
                - Primary details
                    - Name: `gender`
                    - Code: `CGC_Gender`
                - Options
                    - Option 1
                        - Name: `Male`
                        - Code: `CGC_Male`
                    - Option 2
                        - Name: `Female`
                        - Code: `CGC_Female`

    - Program configuration
        - Tracked entity attribute
            - Create tracked entity attribute for `Date of birth`
                - Name: `Date of birth`
                - Short name: `DoB`
                - Code: `CGC_DoB`
                - Value type: `Date`
            
            - Create tracked entity attribute for `First name`
                - Name: `First name`
                - Short name: `CCG_FirstName`
                - Code: `CGC_FirstName`
                - Value type: `Text`

            - Create tracked entity attribute for `Last name`
                - Name: `Last name`
                - Short name: `CCG_LastName`
                - Code: `CGC_LastName`
                - Value type: `Text`
                
            - Create tracked entity attribute for `Gender`
                - Name: `Gender`
                - Short name: `CCG_Gender`
                - Code: `CGC_Gender`
                - Option set: `gender`
                    
        - Tracked entity type
            - Person needs following attributes
                - `First name`
                - `Last name`
                - `Date of birth`
                - `Gender`
                
        - Program
            - Select preferred program
                - Attributes needed
                    - `First name`
                    - `Last name`
                    - `Date of birth`
                    - `Gender`
                    
                - Program stages
                    - Select program stage for growht variables
                        - Data elements
                            - `Weight` (g or kg)
                            - `Height` (cm)
                            - `Head circumference` (cm)
                            - `Report data` (added by default)
                            
- Datastore Manangement configuration
    - In namespace `capture`, enter the file with key `enrollmentOverviewLayout`
        - Add new section for the growth chart under `leftColumn`. You can choose where on the left column to place it. Here is what you can add:
            ```json
                {
                    "source": "<Url of instance>/api/apps/capture-growth-chart/plugin.html",
                    "type": "plugin"
                }
        
    - Create new namespace `capture-growth-chart` with key `config`
        - The growth chart plugin needs this config to work. All Id's should be changed and will be specific for each implementation. The `femaleOptionCode` and `maleOptionCode` should map to the used option codes in the implementation. The structure of the config has to be the same as the one in the example below.
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
                            "defaultStandard": "ID"
                        }
                }
    - Use custom references
        - If you want to use custom references, you can set `customReferences` to `true` in the config. This will make the plugin use the custom references you have set them. If you want to use the default references, you can set `customReferences` to `false` in the config. This will make the plugin use the default references for the program stage.
        - Add your custom references:
            - Create a new key in the `capture-growth-chart` namespace with the key `customReferences`
                - Add the custom references you want to use. The structure of the custom references has to be the same as the one in the example below.
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
