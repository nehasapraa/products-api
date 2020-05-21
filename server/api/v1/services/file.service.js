import * as fs from 'fs';
import path from 'path';

class FileService {
 get_user() {
   return new Promise(function(resolve, reject){
     fs.readFile(path.join(__basedir, '../data/user.json'), 'utf8', (err, data) => {
        err ? reject(err) : resolve(data);
     });
   });
 }
}
export default new FileService();