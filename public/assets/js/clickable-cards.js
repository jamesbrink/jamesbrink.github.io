// Make archive items fully clickable
document.addEventListener('DOMContentLoaded', function() {
  // Get all archive items
  const archiveItems = document.querySelectorAll('.archive__item');
  
  // Process each archive item
  archiveItems.forEach(function(item) {
    // Find the title link inside this archive item
    const titleLink = item.querySelector('.archive__item-title a[rel="permalink"]');
    
    if (titleLink) {
      const linkUrl = titleLink.getAttribute('href');
      
      // Make the entire item clickable, but don't interfere with actual links
      item.addEventListener('click', function(e) {
        // Only redirect if the click wasn't on an actual link or interactive element
        const clickedElement = e.target;
        const isLink = clickedElement.tagName === 'A' || 
                      clickedElement.closest('a') || 
                      clickedElement.tagName === 'BUTTON' ||
                      clickedElement.closest('button');
        
        // Don't redirect if clicking on a link or button
        if (!isLink) {
          window.location.href = linkUrl;
        }
      });
    }
  });
});
