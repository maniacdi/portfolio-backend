const { MongoClient } = require('mongodb');

const localUri = 'mongodb://localhost:27017';
const atlasUri = '<mongodb+srv://magaldi:>';

async function migrate() {
  console.log('🚚 Migrando datos a Atlas...');

  const localClient = new MongoClient(localUri);
  const atlasClient = new MongoClient(atlasUri);

  try {
    // Conectar
    await localClient.connect();
    await atlasClient.connect();
    console.log('✅ Conectado a ambas bases');

    // Obtener datos locales
    const localDb = localClient.db('portfolio');
    const travels = await localDb.collection('travels').find().toArray();
    console.log('📊 Encontrados ' + travels.length + ' viajes en local');

    if (travels.length > 0) {
      // Insertar en Atlas
      const atlasDb = atlasClient.db('portfolio');
      await atlasDb.collection('travels').deleteMany({});
      await atlasDb.collection('travels').insertMany(travels);
      console.log('✅ Migrados ' + travels.length + ' viajes a Atlas');
    }

    console.log('🎉 Migración completada');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await localClient.close();
    await atlasClient.close();
  }
}

migrate();
