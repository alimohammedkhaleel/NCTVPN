import { useState } from 'react';
import ImageWithPlaceholder from './ImageWithPlaceholder';

/**
 * Manual Test Component for ImageWithPlaceholder
 * 
 * This component demonstrates the various states and features of ImageWithPlaceholder:
 * 1. Loading state with shimmer animation
 * 2. Successful image load with fade-in
 * 3. Error state handling
 * 4. Lazy loading support
 * 5. Aspect ratio preservation
 * 
 * To test manually:
 * 1. Import this component in App.jsx temporarily
 * 2. Run `npm run dev`
 * 3. Observe the loading states and transitions
 * 4. Test with slow network throttling in DevTools
 */
const ImageWithPlaceholderTest = () => {
  const [loadCount, setLoadCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  const handleLoad = () => {
    setLoadCount(prev => prev + 1);
    console.log('Image loaded successfully');
  };

  const handleError = () => {
    setErrorCount(prev => prev + 1);
    console.log('Image failed to load');
  };

  return (
    <div style={{ 
      padding: '40px', 
      background: '#111', 
      minHeight: '100vh',
      fontFamily: 'Poppins, Cairo, sans-serif'
    }}>
      <h1 style={{ color: '#facc15', marginBottom: '30px' }}>
        ImageWithPlaceholder Component Tests
      </h1>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        marginBottom: '30px'
      }}>
        {/* Test 1: Valid image with lazy loading */}
        <div>
          <h3 style={{ color: '#fff', marginBottom: '10px' }}>
            Test 1: Valid Image (Lazy)
          </h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ImageWithPlaceholder
              src="/assets/router_device.png"
              alt="Router Device"
              loading="lazy"
              aspectRatio="1/1"
              onLoad={handleLoad}
            />
          </div>
        </div>

        {/* Test 2: Valid image with eager loading */}
        <div>
          <h3 style={{ color: '#fff', marginBottom: '10px' }}>
            Test 2: Valid Image (Eager)
          </h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ImageWithPlaceholder
              src="/assets/server_device.png"
              alt="Server Device"
              loading="eager"
              aspectRatio="1/1"
              onLoad={handleLoad}
            />
          </div>
        </div>

        {/* Test 3: Invalid image (error state) */}
        <div>
          <h3 style={{ color: '#fff', marginBottom: '10px' }}>
            Test 3: Invalid Image (Error)
          </h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ImageWithPlaceholder
              src="/assets/nonexistent-image.png"
              alt="Nonexistent Image"
              loading="lazy"
              aspectRatio="1/1"
              onError={handleError}
            />
          </div>
        </div>

        {/* Test 4: Different aspect ratio */}
        <div>
          <h3 style={{ color: '#fff', marginBottom: '10px' }}>
            Test 4: 16:9 Aspect Ratio
          </h3>
          <div style={{ width: '100%' }}>
            <ImageWithPlaceholder
              src="/assets/firewall_device.png"
              alt="Firewall Device"
              loading="lazy"
              aspectRatio="16/9"
              onLoad={handleLoad}
            />
          </div>
        </div>

        {/* Test 5: Custom className */}
        <div>
          <h3 style={{ color: '#fff', marginBottom: '10px' }}>
            Test 5: Custom Styling
          </h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ImageWithPlaceholder
              src="/assets/switch_device.png"
              alt="Switch Device"
              className="custom-image-test"
              loading="lazy"
              aspectRatio="4/3"
              onLoad={handleLoad}
            />
          </div>
        </div>

        {/* Test 6: No aspect ratio (natural sizing) */}
        <div>
          <h3 style={{ color: '#fff', marginBottom: '10px' }}>
            Test 6: Natural Sizing
          </h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ImageWithPlaceholder
              src="/assets/antenna_device.png"
              alt="Antenna Device"
              loading="lazy"
              onLoad={handleLoad}
            />
          </div>
        </div>
      </div>

      {/* Test Results */}
      <div style={{ 
        background: 'rgba(250, 204, 21, 0.1)', 
        border: '1px solid rgba(250, 204, 21, 0.3)',
        borderRadius: '12px',
        padding: '20px',
        color: '#fff'
      }}>
        <h3 style={{ color: '#facc15', marginBottom: '15px' }}>Test Results</h3>
        <p>✅ Images loaded successfully: <strong>{loadCount}</strong></p>
        <p>❌ Images failed to load: <strong>{errorCount}</strong></p>
        <p style={{ marginTop: '15px', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
          <strong>Testing Instructions:</strong><br />
          1. Open DevTools Network tab<br />
          2. Throttle to "Slow 3G"<br />
          3. Reload the page<br />
          4. Observe shimmer animations while loading<br />
          5. Verify smooth fade-in transitions<br />
          6. Check error state for Test 3
        </p>
      </div>
    </div>
  );
};

export default ImageWithPlaceholderTest;
