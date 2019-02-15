import CollectionProvider from './database_provider';

export default class DurationDB extends CollectionProvider {
  constructor() {
    super('durations');
  }

  makeDuration(client, start, end, service) {
    this.col.then(c => {
      c.insertOne({
        client     : client,
        begin      : start,
        end        : end,
        info       : {
          service : service,
        },
      });
    });
  }

  // transactions that have start time between start and end
  getDurations(client) {
    return this.find({
       client : client,
    });
  }
}
