db.getCollection('places').deleteMany({}); 
db.getCollection('candidats').deleteMany({}); 
db.getCollection('archivedcandidats').deleteMany({}); 
db.getCollection('archivedplaces').deleteMany({});
db.getCollection('whitelisted').deleteMany({});
db.getCollection('evaluations').deleteMany({});
db.getCollection('centres').deleteMany({});
db.getCollection('inspecteurs').deleteMany({});
db.getCollection('users').deleteMany({});
db.getCollection('departements').deleteMany({});