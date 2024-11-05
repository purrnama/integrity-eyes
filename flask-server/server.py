from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import pandas as pd
from heatmap import create_heatmap

states = ["johor", "kedah", "kelantan", "melaka", "negeri sembilan", "pahang", "pulau pinang", "perak", "perlis", "sabah", "sarawak", "selangor", "terengganu", "kuala lumpur"]

app = Flask(__name__,static_folder='../client/build',static_url_path='/')
application = app
CORS(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/current-tender', methods=['GET'])
def current_tender():
    month = request.args.get('month', type=int)
    year = request.args.get('year', type=int)

    df = pd.read_csv('./Merged_Dataset.csv')
    df['TARIKH_PELAWAAN'] = pd.to_datetime(df['TARIKH_PELAWAAN'], format='%d/%m/%Y')

    # Filter by selected year and month
    current_month_count = df[(df['TARIKH_PELAWAAN'].dt.month == month) & (df['TARIKH_PELAWAAN'].dt.year == year)].shape[0]

    # Get previous month
    previous_month = month - 1 if month > 1 else 12
    previous_year = year if month > 1 else year - 1


    previous_month_count = df[(df['TARIKH_PELAWAAN'].dt.month == previous_month) & (df['TARIKH_PELAWAAN'].dt.year == previous_year)].shape[0]

    # Calculate the percentage difference
    if previous_month_count != 0:
        percentage_difference = ((current_month_count - previous_month_count) / previous_month_count) * 100
        percentage_difference = round(percentage_difference, 2)
    else:
        percentage_difference = float('inf') if current_month_count > 0 else 0

    if percentage_difference > 0:
        status = 'positive'
    elif percentage_difference < 0:
        status = 'negative'
    else:
        status = 'no change'

    # Return the result
    return jsonify({
        'current_month_count': current_month_count,
        'percentage_difference': percentage_difference,
        'status': status
    })

@app.route('/total-awarded-contracts', methods=['GET'])
def total_awarded_contracts():
    month = request.args.get('month', type=int)
    year = request.args.get('year', type=int)
    df = pd.read_csv('./output_with_location.csv')

    # Function to find state in address
    def extract_state(address):
        if isinstance(address, str):
            address = address.lower()
            for state in states:
                if state.lower() in address:
                    return state
        return 'Unknown'

    # Apply the function to create a new column with the state
    df['State'] = df['ALAMAT PETENDER BERJAYA'].apply(extract_state)

    # Filter out 'Unknown' state
    df_filtered = df[df['State'] != 'Unknown']

    # Convert the 'TARIKH PAPARAN KEPUTUSAN' column to datetime
    df_filtered['TARIKH PAPARAN KEPUTUSAN'] = pd.to_datetime(df_filtered['TARIKH PAPARAN KEPUTUSAN'], format='%d/%m/%Y')

    # Filter data by the selected month and year
    current_month_df = df_filtered[(df_filtered['TARIKH PAPARAN KEPUTUSAN'].dt.month == month) &
                                   (df_filtered['TARIKH PAPARAN KEPUTUSAN'].dt.year == year)]

    # Calculate the previous month and year
    if month > 1:
        previous_month = month - 1
        previous_year = year
    else:
        previous_month = 12
        previous_year = year - 1

    previous_month_df = df_filtered[(df_filtered['TARIKH PAPARAN KEPUTUSAN'].dt.month == previous_month) &
                                    (df_filtered['TARIKH PAPARAN KEPUTUSAN'].dt.year == previous_year)]

    # Count occurrences of each state in the current and previous month
    current_state_counts = current_month_df['State'].value_counts()
    previous_state_counts = previous_month_df['State'].value_counts()

    # Get total contracts for current and previous month
    current_total_count = current_state_counts.sum()
    previous_total_count = previous_state_counts.sum()

    if not current_state_counts.empty:
        if previous_total_count != 0:
            percentage_difference = ((current_total_count - previous_total_count) / previous_total_count) * 100
            percentage_difference = round(percentage_difference, 2)
        else:
            percentage_difference = float('inf') if current_total_count > 0 else 0

        if percentage_difference > 0:
            status = 'positive'
        elif percentage_difference < 0:
            status = 'negative'
        else:
            status = 'no change'
    else:
        top_state = 'None'
        top_state_count = 0
        percentage_difference = 0
        status = 'no data'

    return jsonify({
        'count': int(current_total_count),
        'percentage_difference': percentage_difference,
        'status': status
    })

@app.route('/top-state', methods=['GET'])
def top_state():
    month = request.args.get('month', type=int)
    year = request.args.get('year', type=int)
    df = pd.read_csv('./output_with_location.csv')

    # Function to find state in address
    def extract_state(address):
        if isinstance(address, str):
            address = address.lower()
            for state in states:
                if state.lower() in address:
                    return state
        return 'Unknown'

    # Apply the function to create a new column with the state
    df['State'] = df['ALAMAT PETENDER BERJAYA'].apply(extract_state)

    # Filter out 'Unknown' state
    df_filtered = df[df['State'] != 'Unknown']

    # Convert the 'TARIKH PAPARAN KEPUTUSAN' column to datetime
    df_filtered['TARIKH PAPARAN KEPUTUSAN'] = pd.to_datetime(df_filtered['TARIKH PAPARAN KEPUTUSAN'], format='%d/%m/%Y')

    # Filter data by the selected month and year
    current_month_df = df_filtered[(df_filtered['TARIKH PAPARAN KEPUTUSAN'].dt.month == month) &
                                   (df_filtered['TARIKH PAPARAN KEPUTUSAN'].dt.year == year)]

    # Calculate the previous month and year
    if month > 1:
        previous_month = month - 1
        previous_year = year
    else:
        previous_month = 12
        previous_year = year - 1

    previous_month_df = df_filtered[(df_filtered['TARIKH PAPARAN KEPUTUSAN'].dt.month == previous_month) &
                                    (df_filtered['TARIKH PAPARAN KEPUTUSAN'].dt.year == previous_year)]

    # Count occurrences of each state in the current and previous month
    current_state_counts = current_month_df['State'].value_counts()
    previous_state_counts = previous_month_df['State'].value_counts()

    # Find the top state in the current month
    if not current_state_counts.empty:
        top_state = current_state_counts.idxmax()  # Get the state with the highest count
        top_state_count = current_state_counts.max()  # Get the highest count

        # Get the count of the same state in the previous month
        previous_state_count = previous_state_counts.get(top_state, 0)

        # Calculate the percentage difference
        if previous_state_count != 0:
            percentage_difference = ((top_state_count - previous_state_count) / previous_state_count) * 100
            percentage_difference = round(percentage_difference, 2)
        else:
            percentage_difference = float('inf') if top_state_count > 0 else 0

        if percentage_difference > 0:
            status = 'positive'
        elif percentage_difference < 0:
            status = 'negative'
        else:
            status = 'no change'
    else:
        top_state = 'None'
        top_state_count = 0
        percentage_difference = 0
        status = 'no data'
    # Return the result as JSON
    return jsonify({
        'state': top_state,
        'count': int(top_state_count),  # Convert to int
        'percentage_difference': percentage_difference,
        'status': status
    })

@app.route('/top-ministry', methods=['GET'])
def top_ministry():
    # Get the selected month and year from the query parameters
    month = request.args.get('month', type=int)
    year = request.args.get('year', type=int)

    # Load the dataset
    df = pd.read_csv('output_with_location.csv')

    # Convert the 'TARIKH PAPARAN KEPUTUSAN' column to datetime
    df['TARIKH PAPARAN KEPUTUSAN'] = pd.to_datetime(df['TARIKH PAPARAN KEPUTUSAN'], format='%d/%m/%Y')

    # Filter data by the selected month and year
    filtered_df = df[(df['TARIKH PAPARAN KEPUTUSAN'].dt.month == month) &
                        (df['TARIKH PAPARAN KEPUTUSAN'].dt.year == year)]

    # Count occurrences of each ministry/agency
    ministry_counts = filtered_df['KEMENTERIAN / AGENSI'].value_counts()

    # Find the ministry/agency with the highest number of contracts
    if not ministry_counts.empty:
        top_ministry = ministry_counts.idxmax()
        top_ministry_count = ministry_counts.max()
    else:
        top_ministry = 'None'
        top_ministry_count = 0

    return jsonify({
        'ministry': top_ministry,
        'count': int(top_ministry_count)
    })

@app.route('/top-companies', methods=['GET'])
def top_companies():
    df = pd.read_csv('output_with_location.csv')

    # Get month and year query parameters from the request
    month = request.args.get('month', type=int)
    year = request.args.get('year', type=int)

    # Filter the DataFrame based on the month and year
    if month and year:
        df['TARIKH PAPARAN KEPUTUSAN'] = pd.to_datetime(df['TARIKH PAPARAN KEPUTUSAN'], format='%d/%m/%Y', errors='coerce')
        df_filtered = df[(df['TARIKH PAPARAN KEPUTUSAN'].dt.month == month) & (df['TARIKH PAPARAN KEPUTUSAN'].dt.year == year)]
    else:
        df_filtered = df

    # Ensure 'HARGA SETUJU TERIMA (RM)' column is numeric for summing
    df_filtered['HARGA SETUJU TERIMA (RM)'] = pd.to_numeric(df_filtered['HARGA SETUJU TERIMA (RM)'], errors='coerce')

    # Group by 'PETENDER BERJAYA' and calculate the sum of 'HARGA SETUJU TERIMA (RM)' for each company
    company_sums = df_filtered.groupby('PETENDER BERJAYA')['HARGA SETUJU TERIMA (RM)'].sum()

    # Count occurrences of each company in the 'PETENDER BERJAYA' column after filtering
    company_counts = df_filtered['PETENDER BERJAYA'].value_counts()

    # Get query parameters for the range
    min_range = int(request.args.get('minRange', 1))
    max_range = int(request.args.get('maxRange', 5))

    # Ensure the ranges are within the bounds of the data
    min_range = max(1, min_range)
    max_range = min(len(company_counts), max_range)

    # Slice the series to get only the desired range
    top_companies_slice = company_counts.iloc[min_range-1:max_range]

    # Get the corresponding sums for the top companies
    top_sums_slice = company_sums[top_companies_slice.index]

    # Convert the result to a dictionary to send as JSON
    top_companies = {
        'companies': top_companies_slice.index.tolist(),
        'counts': top_companies_slice.values.tolist(),
        'sum_price': top_sums_slice.values.tolist()  # Adding the sums
    }

    return jsonify(top_companies)

@app.route('/current-tenders', methods=['GET'])
def get_current_tenders():
    # Load the CSV file
    df = pd.read_csv('Merged_Dataset.csv')

    # Get the month and year from query parameters
    month = request.args.get('month', type=int)
    print (month)
    year = request.args.get('year', type=int)

    # Filter DataFrame by month and year
    if month is not None and year is not None:
        df['TARIKH_PELAWAAN'] = pd.to_datetime(df['TARIKH_PELAWAAN'], format='%d/%m/%Y')
        filtered_df = df[(df['TARIKH_PELAWAAN'].dt.month == month) & (df['TARIKH_PELAWAAN'].dt.year == year)]
    else:
        filtered_df = df  # If no month and year provided, return all tenders
    # Select the required columns
    selected_columns = filtered_df[[
        'NOMBOR_TENDER',
        'TAJUK_TENDER',
        'TARIKH_TUTUP_PELAWAAN',
        'KATEGORI_PEROLEHAN',
        'TARIKH_PELAWAAN',
        'KEMENTERIAN_AGENSI',
        'HARGA_INDIKATIF_JABATAN'
    ]]

    # Rename columns for better readability in the frontend
    selected_columns = selected_columns.rename(columns={
        'NOMBOR_TENDER': 'Tender ID',
        'TAJUK_TENDER': 'Project Name',
        'TARIKH_TUTUP_PELAWAAN': 'Closing Date',
        'KATEGORI_PEROLEHAN': 'Eligibility Criteria',
        'TARIKH_PELAWAAN': 'Region',
        'KEMENTERIAN_AGENSI': 'Contracting Agency',
        'HARGA_INDIKATIF_JABATAN': 'Contact Person'
    })

    # Replace NaN values with None
    selected_columns = selected_columns.where(pd.notnull(selected_columns), None).head(10)

    # Convert the DataFrame to a list of dictionaries
    tenders = selected_columns.to_dict(orient='records')

    print (tenders)

    # Return the data as JSON
    return jsonify(tenders)

@app.route('/get_tender_advertisement', methods=['GET'])
def get_tender_advertisement():
     # Load the CSV file
    df = pd.read_csv('Merged_Dataset.csv')

    # Select the required columns
    selected_columns = df[[
        'NOMBOR_TENDER',
        'TAJUK_TENDER',
        'TARIKH_TUTUP_PELAWAAN',
        'KATEGORI_PEROLEHAN',
        'TARIKH_PELAWAAN',
        'KEMENTERIAN_AGENSI',
        'HARGA_INDIKATIF_JABATAN'
    ]]

    # Rename columns for better readability in the frontend
    selected_columns = selected_columns.rename(columns={
        'NOMBOR_TENDER': 'Tender ID',
        'TAJUK_TENDER': 'Project Name',
        'TARIKH_TUTUP_PELAWAAN': 'Closing Date',
        'KATEGORI_PEROLEHAN': 'Eligibility Criteria',
        'TARIKH_PELAWAAN': 'Region',
        'KEMENTERIAN_AGENSI': 'Contracting Agency',
        'HARGA_INDIKATIF_JABATAN': 'Contact Person'
    })

    # Replace NaN values with None
    selected_columns = selected_columns.where(pd.notnull(selected_columns), None)

    # Convert the DataFrame to a list of dictionaries
    tenders = selected_columns.to_dict(orient='records')

    # Return the data as JSON
    return jsonify(tenders)

@app.route('/get_tender_advertisement_year', methods=['GET'])
def get_tender_advertisement_year():
     # Load the CSV file
    df = pd.read_csv('Merged_Dataset.csv')

    df['TARIKH_TUTUP_PELAWAAN'] = pd.to_datetime(df['TARIKH_TUTUP_PELAWAAN'], format='%d/%m/%Y')

    df['Year'] = df['TARIKH_TUTUP_PELAWAAN'].dt.year

    years = sorted(df['Year'].dropna().unique().tolist(), reverse=True)
    print(years)
    # Return the data as JSON
    return jsonify(years)

@app.route('/get_awarded_contract', methods=['GET'])
def get_awarded_contract():
    # Load the CSV file
    df = pd.read_csv('output_with_location.csv')

    # Select the required columns
    selected_columns = df[[
        'NOMBOR TENDER',
        'TAJUK TENDER',
        'KATEGORI PEROLEHAN',
        'KEMENTERIAN / AGENSI',
        'PETENDER BERJAYA',
        'Location',
        'TARIKH PAPARAN KEPUTUSAN',
        'HARGA SETUJU TERIMA (RM)'
    ]]

    # Rename columns for better readability in the frontend
    selected_columns = selected_columns.rename(columns={
        'NOMBOR TENDER': 'Tender ID',
        'TAJUK TENDER': 'Project Name',
        'KATEGORI PEROLEHAN': 'Acquisition Category',
        'KEMENTERIAN / AGENSI': 'Ministry/ Agencies',
        'PETENDER BERJAYA': 'Successful Tender',
        'Location': 'Region',
        'TARIKH PAPARAN KEPUTUSAN': 'Result Display Day',
        'HARGA SETUJU TERIMA (RM)': 'Agreement Price Accepted (RM)'
    })

    # Convert 'Result Display Day' to datetime to ensure proper sorting
    selected_columns['Result Display Day'] = pd.to_datetime(selected_columns['Result Display Day'], dayfirst=True)

    # Remove rows with NaT (empty) values in 'Result Display Day'
    selected_columns = selected_columns.dropna(subset=['Result Display Day'])

    # Format 'Result Display Day' as '%Y-%m-%d'
    selected_columns['Result Display Day'] = selected_columns['Result Display Day'].dt.strftime('%Y-%m-%d')

    # Sort by 'Result Display Day' in descending order
    selected_columns = selected_columns.sort_values(by='Result Display Day', ascending=False)

    # Replace remaining NaN values with None (if any)
    selected_columns = selected_columns.where(pd.notnull(selected_columns), None)

    # Convert the DataFrame to a list of dictionaries
    tenders = selected_columns.to_dict(orient='records')

    # Return the data as JSON
    return jsonify(tenders)

@app.route('/get_awarded_contract_year', methods=['GET'])
def get_awarded_contract_year():
     # Load the CSV file
    df = pd.read_csv('output_with_location.csv')

    df['TARIKH PAPARAN KEPUTUSAN'] = pd.to_datetime(df['TARIKH PAPARAN KEPUTUSAN'], format='%d/%m/%Y')

    df['Year'] = df['TARIKH PAPARAN KEPUTUSAN'].dt.year

    years = sorted(df['Year'].dropna().unique().tolist(), reverse=True)
    # Return the data as JSON
    return jsonify(years)

@app.route('/get_awarded_contract_region', methods=['GET'])
def get_awarded_contract_region():
     # Load the CSV file
    df = pd.read_csv('output_with_location.csv')

    locations = sorted(df['Location'].dropna().unique().tolist(), reverse=True)

    # Return the data as JSON
    return jsonify(locations)

@app.route('/get_awarded_contract_category', methods=['GET'])
def get_awarded_contract_category():
     # Load the CSV file
    df = pd.read_csv('output_with_location.csv')

    category = sorted(df['KATEGORI PEROLEHAN'].dropna().unique().tolist(), reverse=True)

    # Return the data as JSON
    return jsonify(category)

@app.route('/get_awarded_contract_ministry', methods=['GET'])
def get_awarded_contract_ministry():
     # Load the CSV file
    df = pd.read_csv('output_with_location.csv')

    ministry = sorted(df['KEMENTERIAN / AGENSI'].dropna().unique().tolist(), reverse=True)

    # Return the data as JSON
    return jsonify(ministry)

# Define the route for the heatmap
@app.route('/heatmap')
def display_heatmap():
    create_heatmap()
    return send_file(r'heatmap.html')
    # Load the CSV file into a DataFrame
    df = pd.read_csv(csv_file)

    # Initialize the GoogleTranslator
    translator = GoogleTranslator(source='auto', target='en')

    # Function to safely translate the text
    def safe_translate(text):
        try:
            return translator.translate(text) if pd.notnull(text) else None
        except Exception as e:  # Catch any exception during translation
            print(f"Error translating '{text}': {e}")
            return text  # Return the original text if there's an error

    # Translate the 'KEMENTERIAN_AGENSI' column to English
    df['KEMENTERIAN_AGENSI'] = df['KEMENTERIAN_AGENSI'].apply(safe_translate)

    # Save the DataFrame with the new translated column to a new CSV file
    df.to_csv(output_file, index=False)

    print(f"Translation completed. Translated file saved as {output_file}")

if __name__ == '__main__':
    app.run(debug=True)
