import axios from 'axios';

interface BingWebResult {
  id: string;
  name: string;
  url: string;
  snippet: string;
  dateLastCrawled: string;
}

interface BingSearchResponse {
  webPages?: {
    value: BingWebResult[];
    totalEstimatedMatches: number;
  };
}

const BING_ENDPOINT = 'https://api.bing.microsoft.com/';
const BING_KEY = 'f1dc551d19c1426a998253abe528c561';

export const searchBing = async (query: string): Promise<BingWebResult[]> => {
  try {
    const response = await axios.get<BingSearchResponse>(`${BING_ENDPOINT}v7.0/search`, {
      params: {
        q: query,
        count: 5, // Limit to 5 results as requested
        textDecorations: false,
        textFormat: 'raw'
      },
      headers: {
        'Ocp-Apim-Subscription-Key': BING_KEY,
        'Accept': 'application/json'
      }
    });

    if (!response.data.webPages?.value) {
      return [];
    }

    return response.data.webPages.value.map(result => ({
      id: result.id,
      name: result.name,
      url: result.url,
      snippet: result.snippet,
      dateLastCrawled: result.dateLastCrawled
    }));
  } catch (error) {
    console.error('Bing search failed:', error);
    throw new Error('Search failed. Please try again later.');
  }
}
