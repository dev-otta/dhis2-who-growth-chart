# Capture Growth Charts

A plugin for displaying growth charts in the Capture app.
The plugin is based on the [WHO growth standards](https://www.who.int/childgrowth/standards/en/) and is intended to be used in the context of child growth monitoring or nutrition programs.

## Features

- Display growth charts for weight-for-age, height-for-age, weight-for-height, and head circumference-for-age.
- Display growth charts for children aged 0-5 years.
- Easily switch between different growth charts.
- Create printed copies for parents or health workers.

## Installation

1. Download the latest version of the plugin from the [App hub](https://apps.dhis2.org).
2. Upload the plugin to your DHIS2 instance.
3. Configure the capture app to display the growth charts in the correct context.
4. Map required data elements and attributes to the growth chart plugin.

## Configuration

The plugins expect a configuration object to be found in the Data Store. The configuration object tells the plugin which data elements and attributes to use when calculating the growth charts.

The configuration object should look something like this:

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
        "programStages": [
            {
                "programId": "program1_id",
                "programStageId": "h3gT08Et4sC"
            }
        ]
    },
    "settings": {
        "usePercentiles": false,
        "customReferences": false,
        "weightInGrams": false,
        "defaultIndicator": "wfa"
    }
}

```

Want to read more in details of how to configure the plugin? Check out the [documentation](https://github.com/dev-otta/dhis2-who-growth-chart/blob/master/docs/using-capture-growth-charts.md) in our user guide.

