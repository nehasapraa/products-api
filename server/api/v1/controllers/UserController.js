import UserService from '../services/user.service';
export class UserController {
  user(req, res) {
    UserService.get_user().then(r =>
    res.send(r));
  }
}
export default new UserController();
