# https://github.com/MarioVilas/googlesearch/issues/122
import sys
import requests
from bs4 import BeautifulSoup
from googlesearch import search
import pandas as pd
import time
import os
from datetime import datetime

# Define a user-agent to mimic a real browser visit
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

def fetch_search_results(query, tbs="qdr:d1", num_results=100):
    """
    Fetches Google search results and scrapes the title and description for each URL.
    """
    results = []
    print(f"Fetching up to {num_results} results for query: '{query}'...")

    # Use the num_results to control the number of pages fetched
    for i, url in enumerate(search(query, tbs=tbs, num=num_results, stop=num_results, pause=2.0)):
        if i >= num_results:
            break
        
        print(f"[{i+1}/{num_results}] Processing: {url}")
        
        try:
            # Fetch the content of the URL with a timeout
            response = requests.get(url, headers=HEADERS, timeout=10)
            response.raise_for_status()

            soup = BeautifulSoup(response.content, 'html.parser')
            
            title_tag = soup.find('title')
            title = title_tag.get_text().strip() if title_tag else "No Title Found"

            description_tag = soup.find('meta', attrs={'name': 'description'})
            description = description_tag['content'].strip() if description_tag and description_tag.get('content') else "No Description Found"

            results.append({"URL": url, "Title": title, "Description": description})
            
        except requests.exceptions.RequestException as e:
            print(f"  -> Error fetching {url}: {e}")
            results.append({"URL": url, "Title": "Error - Could not fetch", "Description": str(e)})
        except Exception as e:
            print(f"  -> An unexpected error occurred for {url}: {e}")
            results.append({"URL": url, "Title": "Error - Processing failed", "Description": str(e)})
            
        time.sleep(0.5)

    return results

# --- UPDATED FUNCTION WITH APPEND & DEDUPLICATE LOGIC ---
def save_to_csv(results, folder_name="results"):
    """
    Saves results to a CSV file named with the current date in a specific folder.
    If the file already exists, it appends the new results and removes duplicates based on the URL.
    """
    if not results:
        print("No results to save.")
        return

    os.makedirs(folder_name, exist_ok=True)
    
    date_str = datetime.now().strftime("%Y-%m-%d")
    filename = f"{date_str}.csv"
    full_path = os.path.join(folder_name, filename)

    new_df = pd.DataFrame(results)

    if os.path.exists(full_path):
        print(f"File '{full_path}' exists. Appending new data and de-duplicating...")
        try:
            # Read the existing data from the CSV
            existing_df = pd.read_csv(full_path)
            # Combine the old and new dataframes
            combined_df = pd.concat([existing_df, new_df], ignore_index=True)
            # Drop duplicates based on the 'URL' column, keeping the last entry
            final_df = combined_df.drop_duplicates(subset=['URL'], keep='last')
            
            # Calculate how many new rows were actually added
            rows_added = len(final_df) - len(existing_df)
            print(f"Appended {rows_added} new unique results.")

        except pd.errors.EmptyDataError:
            # If the existing file is empty, just use the new data
            print("Existing file is empty. Saving new results.")
            final_df = new_df
    else:
        print(f"Creating new file: '{full_path}'")
        final_df = new_df

    # Save the final, de-duplicated dataframe to the CSV
    final_df.to_csv(full_path, index=False, encoding='utf-8-sig')
    print(f"Successfully saved. Total unique results in file: {len(final_df)}")
# --- END OF UPDATED FUNCTION ---


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python your_script_name.py \"<your search query>\"")
        sys.exit(1)
        
    query = sys.argv[1]
    
    # :param str tbs: Time limits ("qdr:h" => last hour, "qdr:d" => last 24 hours, "qdr:y1" => last year).
    results = fetch_search_results(query, tbs="qdr:h6", num_results=20)
    
    save_to_csv(results)
