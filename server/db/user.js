import CollectionProvider from './database_provider';

export default class UserDB extends CollectionProvider {
  constructor() {
    super('users');

    this.insertMocks();
  }

  insertMocks() {
    this.insertUser(1, null, 1);
    this.insertUser(2, null, 2);
    this.insertUser(3, null, 3);
    this.insertUser(4, null, 4);
  }

  // inserts a user if not present
  insertUser(publicKey, info, tid) {
    this.findOne({
      publicKey : publicKey
    }).then(res => {
      if (res == null) {
        // if not present
        this.col.then(c => {
          c.insertOne({
            publicKey : publicKey,
            info      : info,
            tid       : tid
          });
        });
      } else {
        // user is present
        console.log(`Entry ${publicKey} already present.`)
      }
    });
  }

  getUser(publicKey) {
    return this.findOne({
      publicKey : publicKey
    });
  }
}
