import pandas as pd
import os
import json

def extract_sd_columns(file_path, first_column):
    # Read the Excel file
    df = pd.read_excel(file_path)

    # Extract the required columns
    columns_to_extract = [first_column, 'SD0', 'SD1', 'SD2', 'SD3', 'SD1neg', 'SD2neg', 'SD3neg']
    df = df[columns_to_extract]

    # Convert to JSON
    json_data = df.to_dict(orient='records')

    return json_data

def determine_first_column(df):
    # Check if either "Month" or "Week" exists in columns
    if "Month" in df.columns:
        return "Month"
    elif "Week" in df.columns:
        return "Week"
    elif "Height" in df.columns:
        return "Height"
    elif "Length" in df.columns:
        return "Length"
    else:
        print(df.columns)
        raise ValueError("Neither 'Month' nor 'Week' column found in the DataFrame")
        

def convert_files_to_json(input_folder, output_folder):
    # Create output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Iterate over folders in input folder
    for folder_name in os.listdir(input_folder):
        input_subfolder = os.path.join(input_folder, folder_name)
        output_subfolder = os.path.join(output_folder, folder_name)
        
        if os.path.isdir(input_subfolder):
            # Create output subfolder if it doesn't exist
            if not os.path.exists(output_subfolder):
                os.makedirs(output_subfolder)

            # Process each file in the input subfolder
            for file_name in os.listdir(input_subfolder):
                if file_name.endswith('.xlsx'):
                    file_path = os.path.join(input_subfolder, file_name)
                    df = pd.read_excel(file_path)
                    first_column = determine_first_column(df)
                    json_data = extract_sd_columns(file_path, first_column)

                    # Write JSON data to output file
                    output_file_path = os.path.join(output_subfolder, os.path.splitext(file_name)[0] + '.json')
                    with open(output_file_path, 'w') as json_file:
                        json.dump(json_data, json_file, indent=4)

if __name__ == "__main__":
    input_folder = 'path'  # Path to the folder containing all the measurement folders
    output_folder = './src\\DataSets\\newWhoStandardDataSets'  # Path to the output folder
    convert_files_to_json(input_folder, output_folder)
