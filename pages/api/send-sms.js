export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Access environment variables securely
  const freeUser = process.env.FREE_USER;
  const freePass = process.env.FREE_PASS;

  if (!freeUser || !freePass) {
    console.error('FREE_USER or FREE_PASS environment variables are not set.');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  // Construct the message
  const msg = `[Portfolio Message]\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

  // Encode the message and other parameters
  const encodedMsg = encodeURIComponent(msg);
  const encodedUser = encodeURIComponent(freeUser);
  const encodedPass = encodeURIComponent(freePass);

  // Construct the Free Mobile SMS API URL
  const url = `https://smsapi.free-mobile.fr/sendmsg?user=${encodedUser}&pass=${encodedPass}&msg=${encodedMsg}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SMS API Error:', errorText);
      return res
        .status(response.status)
        .json({ message: 'Failed to send SMS' });
    }

    return res.status(200).json({ message: 'SMS sent successfully!' });
  } catch (error) {
    console.error('Fetch Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
