const generateEmailBody = async (product, type) => {
  const shortenedTitle =
    product.title.length > 20
      ? `${product.title.substring(0, 20)}.....`
      : product.title;
  let subject = `Welcome to Price Tracking for ${shortenedTitle}`;
  let body = `
        <div>
          <h2>Welcome to PriceTracker 🚀</h2>
          <p>You are now tracking ${product.title}.</p>
          <p>Here's an example of how you'll receive updates:</p>
          <div style="border: 1px solid #ccc; padding: 10px; background-color: #f8f8f8;">
            <h3>${product.title} is back in stock!</h3>
            <p>We're excited to let you know that ${product.title} is now back in stock.</p>
            <p>Don't miss out - <a href="${product.url}" target="_blank" rel="noopener noreferrer">buy it now</a>!</p>
          </div>
          <p>Stay tuned for more updates on ${product.title} and other products you're tracking.</p>
        </div>
      `;
  return { subject, body };
};

module.exports = generateEmailBody;
