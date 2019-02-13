import CollectionProvider from './database_provider';

export default class DurationDB extends CollectionProvider {
  constructor() {
    super('durations');
  }

  // TODO: add total hours on latest duration(?)
  makeDuration(from, to, start, end, info) {
    // if not present
    this.col.then(c => {
      c.insertOne({
        from       : from.publicKey,
        to         : to.publicKey,
        start      : start,
        end        : end,
        info       : info,
      });
    });
  }

  // transactions that have start time between start and end
  getDurations(from, start, end) {
    return this.find({
      from  : from,
      start : {
        $gte : start,
        $lte : end
      }
    });
  }
}
