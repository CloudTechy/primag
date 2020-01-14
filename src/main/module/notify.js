import { userInfo, platform } from 'os'
import { notify } from 'node-notifier'

let logoPath = '../../static/logo.png'
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