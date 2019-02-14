import UserDB     from './user';
import DurationDB from './duration';

export default class DBApi {
  constructor() {
    this.users     = new UserDB();
    this.durations = new DurationDB();
  }

  register(server) {
    server.get('/api/user/:publicKey', (req, res) => {
      let who = parseInt(req.params.publicKey);
      this.users.getUser(who).then(user => {
        console.log(user);
        res.send(user);
      });
    });

    server.get('/api/duration/:from/:start/:end', (req, res) => {
      this.durations.getDurations(
          parseInt(req.params.from),
          parseInt(req.params.start),
          parseInt(req.params.end),
      ).then(durations => {
        res.send({
          "durations" : durations
        });
      });
    });
  }
}
