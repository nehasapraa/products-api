import UserService from '../services/user.service';
export class UserController {
  user(req, res) {
    UserService.get_user()
      .then(r => res.send(r))
      .catch(e => {
        res.send(`Error ${e.message}`);
      });
  }
}
export default new UserController();
