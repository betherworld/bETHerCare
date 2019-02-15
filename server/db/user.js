import CollectionProvider from './database_provider';

export default class UserDB extends CollectionProvider {
  constructor() {
    super('users');
  }

  // inserts a user if not present
  insertUser(client, info, tid) {
    return new Promise((resolve, reject) => {
      this.findOne({
        client : client
      }).then(res => {
        if (res == null) {
          // if not present
          this.col.then(c => {
            c.insertOne({
              client    : client,
              info      : info,
              tid       : tid
            });
          });
        } else {
          // user is present
          console.log(`Entry ${client} already present.`)
        }
      }).then(resolve);
    });
  }

  getUser(client) {
    return this.findOne({
      client : client
    });
  }
}
