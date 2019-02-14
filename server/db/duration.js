import CollectionProvider from './database_provider';

export default class DurationDB extends CollectionProvider {
  constructor() {
    super('durations');
  }

  // TODO: add total hours on latest duration(?)
  makeDuration(to, start, end, service) {
    // if not present
    this.col.then(c => {
      c.insertOne({
        receiver   : to,
        begin      : start,
        end        : end,
        service    : service,
      });
    });
  }

  // transactions that have start time between start and end
  getDurations(to, start, end) {
    return this.find({
      receiver : to,
      start : {
        $gte : start,
        $lte : end
      }
    });
  }
}
