import { useState, useEffect } from 'react';

export const useTrialPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('hasSeenTrialPopup');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    
    // Show popup if:
    // 1. User hasn't seen it before, OR
    // 2. It's been more than 24 hours since last visit
    if (!hasSeenPopup || (lastVisit && now - parseInt(lastVisit) > 24 * 60 * 60 * 1000)) {
      // Show popup after 3 seconds delay
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    localStorage.setItem('hasSeenTrialPopup', 'true');
    localStorage.setItem('lastVisit', Date.now().toString());
  };

  const handleBookTrial = (data: any) => {
    console.log('Trial booked:', data);
    // You can add additional logic here like sending to analytics, etc.
  };

  return {
    showPopup,
    closePopup,
    handleBookTrial
  };
};