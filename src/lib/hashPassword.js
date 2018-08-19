import bcrypt from 'bcryptjs'
import hashes from 'jshashes'
const sha1 = new hashes.SHA1()

export default cleartext => bcrypt.hash(sha1.hex(cleartext), 5)
