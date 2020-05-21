import file from './file.service';
class UserService {
  get_user() {
    return file.get_user();
  }
}

export default new UserService();