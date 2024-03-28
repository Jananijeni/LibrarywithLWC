Public with sharing class BookSearchController {
    @AuraEnabled(cacheable=true)
    public static List<BookResult> searchBooks(String bookName) {
        List<BookResult> results = new List<BookResult>();
        try {
            String apiUrl = 'https://openlibrary.org/search.json?q=' + EncodingUtil.urlEncode(bookName, 'UTF-8');
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint(apiUrl);
            request.setMethod('GET');
            
            HttpResponse response = http.send(request);
            if (response.getStatusCode() == 200) {
                Map<String, Object> jsonResponse = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                List<Object> docs = (List<Object>) jsonResponse.get('docs');
                
				// Process only the first book
               /* if (!docs.isEmpty()) {
                    results.add(new BookResult((Map<String, Object>) docs[0]));
                            System.debug('Get Books List' + results);

                } */
                
                // Process all book results
                for (Object doc : docs) {
                    results.add(new BookResult((Map<String, Object>) doc));


                } 
                
            } else {
                System.debug('Error Response: ' + response.getBody());
            }
        } catch(Exception e) {
            System.debug('Exception Occurred: ' + e.getMessage());
        }
        return results;
    }

    public class BookResult {
        @AuraEnabled
        public String title { get; set; }
        @AuraEnabled
        public List<String> author_name { get; set; }
        @AuraEnabled
    	public String bookLink { get; set; }

        
        public BookResult(Map<String, Object> doc) {
            this.title = (String) doc.get('title_suggest');
            this.author_name = new List<String>();
            
            // Check if author_name field exists and is a list
            if (doc.containsKey('author_name') && doc.get('author_name') instanceof List<Object>) {
                List<Object> authors = (List<Object>) doc.get('author_name');
                for (Object author : authors) {
                    if (author instanceof String) {
                        this.author_name.add((String) author);
                    }
                }
            }
            
				String bookKey = (String) doc.get('key');
				this.bookLink = 'https://openlibrary.org' + bookKey;

        }
    }
}
