export const bannerStyles = {
    component: {
      selector: '.fs-consent_component',
      styles: {
        display: 'flex',
        position: 'fixed',
        zIndex: '9999',
        width: '100%',
        height: 'auto'
      }
    },
    banner: {
      selector: '.fs-consent_banner',
      styles: {
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        padding: '24px',
        maxWidth: '500px',
        margin: '0 auto'
      }
    },
    button: {
      selector: '.fs-consent_button',
      styles: {
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      },
      variants: {
        accept: {
          backgroundColor: '#4CAF50',
          color: '#FFFFFF'
        },
        reject: {
          backgroundColor: '#555555',
          color: '#FFFFFF'
        }
      }
    }
  };