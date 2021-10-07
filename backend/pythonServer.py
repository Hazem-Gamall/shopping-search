from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import time
import threading
from scraper import AmazonScraper, JumiaScraper

amazonScraper = AmazonScraper()
jumiaScraper = JumiaScraper()

class requestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if not self.path.endswith('/favicon.ico'):
            startTime = time.time()
            amazonScraper.setQuery(self.path[1:])
            jumiaScraper.setQuery(self.path[1:])

            print(self.path[1:])
            
            finalResult = {}

            t1 = threading.Thread(target=amazonScraper.scrap())
            t2 = threading.Thread(target=jumiaScraper.scrap())
            t1.start()
            t2.start()
            
            t1.join()
            finalResult['amazon'] = amazonScraper.getResults()
            t2.join()
            finalResult['jumia'] = jumiaScraper.getResults()

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(finalResult).encode())

            print(time.time() - startTime)

def main():
    port = 9000
    server_address = ("localhost", port)
    server = HTTPServer(server_address, requestHandler)
    server.serve_forever()

if __name__ == '__main__':
    main()