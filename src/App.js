import React, { useState, useEffect } from 'react';

const App = () => {
  const [category, setCategory] = useState('nature');
  const [images, setImages] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const apiKey = '49520823-5464e89cea25101ef13a108e4'; 

  // Fetch images when category changes
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${apiKey}&q=${category}&image_type=photo`
        );
        const data = await response.json();
        setImages(data.hits);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [category]);

  return (
    <div>
      
      <div>
        <button onClick={() => setCategory('nature')}>Nature</button>
        <button onClick={() => setCategory('city')}>City</button>
        <button onClick={() => setCategory('abstract')}>Abstract</button>
      </div>

      {/* Galeria */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {images.map((image) => (
          <img
            key={image.id}
            src={image.previewURL}
            alt={image.tags}
            style={{ width: '100px', cursor: 'pointer' }}
            onClick={() => setModalImage(image.largeImageURL)}
          />
        ))}
      </div>

      {/* Jak klikamy w zdjecie */}
      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            
          }}
        >
          <img
            src={modalImage}
            alt="Enlarged"
            style={{ maxWidth: '90%', maxHeight: '90%' }}
          />
        </div>
      )}
    </div>
  );
};

export default App;
