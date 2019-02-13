import UserDB     from './db/user';
import DurationDB from './db/duration';
import Chain from './chain';

// Api class that uses all backend services(e.g. Database, Chain, etc.)
export default class Api {
  constructor(server) {
    this.server = server;

    // server components
    this.chain = new Chain();

    // database collections
    this.users     = new UserDB();
    this.durations = new DurationDB();
  }

  register() {
    // requests to usual services should respond directly
    this.server.get('/api/hello', (req, res) => {
      res.send({
        'hello' : 'world'
      });
    });

    // request to the Blockchain should be async, i.e. via handlers
    this.server.get('/api/accounts', (req, res) => {
      this.chain.handleAccounts(res);
    });
    this.server.get('/api/register/:publicKey', (req, res) => {
      this.chain.handleRegister(res, req.params.publicKey);
    });

    // TODO: should we expose this?
    this.server.get('/api/user/:publicKey', (req, res) => {
      let who = parseInt(req.params.publicKey);
      this.users.getUser(who).then(user => {
        console.log(user);
        res.send(user);
      });
    });

    this.server.get('/api/duration/:from/:start/:end', (req, res) => {
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
