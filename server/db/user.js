import CollectionProvider from './database_provider';

export default class UserDB extends CollectionProvider {
  constructor() {
    super('users');
  }

  // inserts a user if not present
  insertUser(publicKey, info, tid) {
    return new Promise((resolve, reject) => {
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
      }).then(resolve);
    });
  }

  getUser(publicKey) {
    return this.findOne({
      publicKey : publicKey
    });
  }
}
