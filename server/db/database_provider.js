import MongoClient from 'mongodb';

const INST_LOCATION = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'beth';

class DatabaseProvider {
  constructor() {
    this.conn = MongoClient.connect(INST_LOCATION).then(i => i.db(DB_NAME));
  }
}

export default class CollectionProvider extends DatabaseProvider {
  constructor(collection) {
    super();
    this.col = this.conn.then(db => db.collection(collection));
  }

  // find the first entry that satisfies the query
  findOne(query) {
    return new Promise((resolve, reject) => {
      this.col.then(c => {
        let val = c.findOne(query, (_, res) => {
          resolve(res);
        });
      });
    });
  }

  // find array of entries that satisfy query
  find(query) {
    return new Promise((resolve, reject) => {
      this.col.then(c => {
        let val = c.find(query).toArray((_, res) => {
          resolve(res);
        });
      });
    });
  }
}
