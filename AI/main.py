import pyodbc
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# Define connection parameters
server = '103.98.160.26'  # Example: 'localhost' or 'server_name\instance_name'
database = 'PTUDTT'
username = 'SA'
password = '12345678Aa@'

# Create a connection string
connection_string = 'DRIVER={ODBC Driver 17 for SQL Server};SERVER=103.98.160.26;DATABASE=PTUDTT;UID=SA;PWD=12345678Aa@'

conn = pyodbc.connect(connection_string)
query = "SELECT Id, ProductName, [Desc] FROM products"
df = pd.read_sql(query, conn)



df['combined'] = df['ProductName'] + ' ' + df['Desc']

vectorizer = TfidfVectorizer(stop_words='english')
X = vectorizer.fit_transform(df['combined'])

cosine_sim = cosine_similarity(X, X)

def recommend_products(product_id, top_n=5):
    # Get the index of the product
    idx = df.index[df['Id'] == product_id].tolist()[0]

    # Get similarity scores for the product
    sim_scores = list(enumerate(cosine_sim[idx]))

    # Sort products by similarity score
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the indices of the top n most similar products
    sim_scores = sim_scores[1:top_n+1]
    product_indices = [i[0] for i in sim_scores]

    # Return the top n similar products
    return df.iloc[product_indices]

# Example usage
recommended_products = recommend_products(product_id=3, top_n=5)
print(recommended_products)
