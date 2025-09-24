export const fetchPhotosFromStorage = async (
  folder: string
): Promise<string[]> => {
  try {
    const response = await fetch(`/api/images/${folder}`);

    if (response.ok) {
      return (await response.json()) as string[];
    }

    throw new Error(`HTTP error! status: ${response.status}`);
  } catch (error) {
    console.log(`Error fetching photos from ${folder}:`, error);
    throw new Error(`Failed to fetch images from ${folder}`);
  }
};
