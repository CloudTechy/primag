import { userInfo, platform } from 'os'
import { notify } from 'node-notifier'
import { join } from 'path'

let logoPath = join(__dirname, '../../../static/logo.png')
class Notify {
    static alert(title, message) {
        notify({
            title,
            message,
            sound: true,
            wait: true,
            icon: logoPath
        })
    }
    static dbSuccess() {
        notify({
            title: `Welcome ${userInfo().username}`,
            message: `You are ready to use Primag on your ${platform()} platform`,
            sound: true,
            wait: true,
            icon: logoPath
        })
    }
}
export default Notify