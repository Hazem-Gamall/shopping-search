import requests
from bs4 import BeautifulSoup

class BaseScraper():
    def __init__(self):
        self.query = None
        self.query = None
        self.results = None
        self.url = None
    
    def setQuery(self, query, sort):
        self.query = query
        self.sort = sort
        self.url = self._setUrl()
    
    def _setUrl(self):
        pass

    def scrap(self):
        pass

    def getResults(self):
        return self.results


class AmazonScraper(BaseScraper):

    def _setUrl(self):        
        sortQuery = 'price-desc-rank' if self.sort =='true' else ''
        return f'https://www.amazon.eg/s?k={self.query}&s={sortQuery}&language=en'
    
    def scrap(self):
        searchResults = []

        request = requests.get(self.url, headers={'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36'})
        if request.status_code != 200:
            print(f'Amazon request error:{request.status_code}')
            self.results = []
            return
        soup = BeautifulSoup(request.content, 'html.parser')
        resultDivs = soup.find_all(class_='s-result-item')



        i = 0
        for item in resultDivs:
            result = {}
            if item.findNext('h2') is None: continue
            result['id'] = i
            result['title'] = item.findNext('h2').text 
            result['price'] = item.findNext('span', class_="a-price").findNext('span').text
            result['image'] = item.findNext('img')['src']
            result['url'] = 'https://www.amazon.eg' + item.findNext('a')['href']
            searchResults.append(result)
            i+=1
            if i == 15:
                break


        self.results = searchResults



class JumiaScraper(BaseScraper):
    def _setUrl(self):
        sortQuery = 'highest-price' if self.sort =='true' else ''
        return f'https://www.jumia.com.eg/catalog/?q={self.query}&sort={sortQuery}'

    def scrap(self):
        searchResults = []
        
        request = requests.get(self.url)
        if request.status_code != 200:
            print(f'Jumia request error:{request.status_code}, {request.reason}')
            self.results = []
            return
        soup = BeautifulSoup(request.content, 'html.parser')

        resultElements = soup.find(class_='-pvs col12').find_all('article')

        i = 0
        for item in resultElements:
            # print(str(item) + '\n')            
            if item.findNext('a').has_attr('href'):
                result = {}
                result['id'] = i
                result['title'] = item.findNext('h3').text
                result['price'] = item.findNext(class_='prc').text
                result['image'] = item.findNext('img')['data-src']
                result['url'] = 'https://www.jumia.com.eg' + item.findNext('a')['href']
            
                searchResults.append(result)
                i+=1
                if i == 15:
                    break

        self.results = searchResults

class NoonScraper(BaseScraper):
    def _setUrl(self):
        return f'https://www.noon.com/egypt-en/search?q={self.query}&sort[by]=price&sort[dir]=desc'

    def scrap(self):
        searchResults = []
        
        request = requests.get(self.url, headers={'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36'})
        if request.status_code != 200:
            print(f'request error:{request.status_code}')
            exit()
        soup = BeautifulSoup(request.content, 'html.parser')

        # resultDivs = soup.find_all(class_='sc-1xjgu8-2 lgLLLe')
        with open('test.html', 'w') as f:
            f.write(str(soup.prettify()))    
        
        # print(resultDivs)
        # print(resultDivs[0].findNext('a')['href'])
        # print(resultDivs[1].findNext('img').findNext('img')['src'])

        


# query = input("enter the search query: ")

# searchResults = []
# jsonResults = {}

# request = requests.get(f'https://www.amazon.eg/s?k={query}&language=en')
# if request.status_code != 200:
#     print(f'request error:{request.status_code}')
#     exit()
# soup = BeautifulSoup(request.content, 'html.parser')
# resultDivs = soup.find_all(class_='s-result-item')[1:]


# i = 0
# for item in resultDivs:
#     result = {}
#     if item.findNext('h2') is None: continue
#     result['id'] = i
#     result['title'] = item.findNext('h2').text 
#     result['price'] = item.findNext('span', class_="a-price").findNext('span').text
#     result['image'] = item.findNext('img')['src']
#     searchResults.append(result)
#     i+=1


# jsonResults['results'] = searchResults
# json_data = json.dumps(jsonResults)

# scraper = amazonScraper()
# scraper.setQuery('galaxy s21')

# with open('data.json', 'w', encoding='utf-8') as f:
#     f.write(scraper.scrap())
