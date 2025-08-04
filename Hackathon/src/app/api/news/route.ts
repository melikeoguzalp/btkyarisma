
import { NextResponse } from 'next/server';

type UsomNewsItem = {
  id: number;
  url_adres: string;
  zararli_yazilim: string | null;
  tarih: string;
  kaynak: string;
};

export async function GET() {
  try {
    const response = await fetch('https://www.usom.gov.tr/url-list.json', {
        next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      console.error('Failed to fetch from USOM, status:', response.status);
      return NextResponse.json(
        { message: 'Failed to fetch data from USOM.' },
        { status: response.status }
      );
    }

    const jsonData = await response.json();
    
    // USOM API can sometimes return the array directly, or nested under a 'data' key.
    // This handles both cases.
    let articles: UsomNewsItem[];
    if (Array.isArray(jsonData)) {
        articles = jsonData;
    } else if (jsonData && Array.isArray(jsonData.data)) {
        articles = jsonData.data;
    } else {
        throw new Error('USOM data is not in the expected format.');
    }

    return NextResponse.json(articles);

  } catch (error) {
    console.error('Error in /api/news route:', error);
    return NextResponse.json(
      { message: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
