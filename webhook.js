const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // Choisissez le port que vous souhaitez utiliser pour votre serveur webhook

// Endpoint pour le webhook
app.post('/webhook', async (req, res) => {
  try {
    const imageUrl = req.body.image_url;

    // Télécharger l'image depuis l'URL
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const contentType = imageResponse.headers['content-type'];

    // Envoyer l'image en réponse
    res.set('Content-Type', contentType);
    res.send(imageResponse.data);
  } catch (error) {
    console.error('Erreur lors du traitement de la réponse du webhook:', error);
    res.sendStatus(500);
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur webhook démarré sur le port ${port}`);
});
