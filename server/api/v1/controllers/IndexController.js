export class IndexController {
  user(req, res) {
    res.redirect('/user');
  }
}
export default new IndexController();
