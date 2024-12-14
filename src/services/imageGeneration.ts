import axios from 'axios';

interface ImageGenerationResponse {
  imageUrl: string;
  error?: string;
}

export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const response = await axios.post<ImageGenerationResponse>(
      'http://localhost:8000/api/generate-image',
      { prompt }
    );

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data.imageUrl;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error('Failed to generate image: Unknown error');
  }
};
