import UserDB     from './user';
import DurationDB from './duration';

export default class DBApi {
  constructor() {
    this.users     = new UserDB();
    this.durations = new DurationDB();
  }

  register(server) {
    server.get('/api/user/:user', (req, res) => {
      let who = req.params.user;
      this.users.getUser(who).then(user => {
        console.log(user);
        res.send(user);
      });
    });

    server.get('/api/duration/:from/:start/:end', (req, res) => {
      this.durations.getDurations(
          req.params.from,
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
