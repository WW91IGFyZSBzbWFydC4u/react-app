import requests
from datetime import datetime
import time

# Global settings

api_dev_key 		    = 'b8a02c807e2dfa5ebc313be15fee42df'
api_paste_code 		    = ''
api_paste_private 		= '0' # 0=public 1=unlisted 2=private
api_paste_name			= ''
api_paste_expire_date 	= '1H'
api_paste_format 		= ''
api_user_key 			= '' # if an invalid or expired api_user_key is used, an error will spawn. If no api_user_key is used, a guest paste will be created

API_ENDPOINT = 'https://pastebin.com/api/api_post.php'

timeBetweenPastes = 80

# Logfile
logfile = 'E:\Projects\Python\AutoPastebin\AutoPaste.log'

pastes = [
    'ssh 18.190.146.24 \r\ngreylion48:codmw1\r\nserfish.com/console/',
    'ssh 18.190.146.24 \r\nvivienne:cutieboy\r\nserfish.com/console/',
    'ssh 18.190.146.24 \r\nbigfrog157:spirit52\r\nserfish.com/console/',
    'ssh 18.190.146.24 \r\nwalleted:sepoy999\r\nserfish.com/console/',
    'ssh 18.190.146.24 \r\ngrimaware:temp1234\r\nserfish.com/console/',
    'ssh 18.190.146.24 \r\nemver3:antares4\r\nserfish.com/console/',
    'ssh 18.190.146.24 \r\nkudzu:glow91\r\nserfish.com/console/',
    'ssh 18.190.146.24 \r\nthalassian:14111998\r\nserfish.com/console/',
    'ssh 18.190.146.24 \r\nnictate:antares4\r\nserfish.com/console/',
    'ssh 18.190.146.24 \r\nmulleyloom5000:dougie41\r\nserfish.com/console/',
    'ssh 18.190.146.24 \r\nambience:vague74\r\nserfish.com/console/',
    'ssh 18.190.146.24 \r\nchariot:slent5\r\nserfish.com/console/',
    'ssh 18.190.146.24 \r\nhornswoggle:argon14\r\nserfish.com/console/',
    'ssh 18.190.146.24 \r\npizzazzz:ham666 \r\nserfish.com/console/',
]

def sendPost(data):
    r = requests.post(url=API_ENDPOINT, data=data)
    return r

def defineData(i):

    data = {'api_dev_key': api_dev_key,
            'api_option': 'paste',
            'api_paste_code': pastes[i],
            'api_paste_private': api_paste_private,
            'api_paste_expire_date': api_paste_expire_date
            }
    return data

def main():

    i = 0
    while i < 10:
        data = defineData(i)
        r = sendPost(data)

        f = open(logfile, "a")
        f.write(datetime.now().strftime('%d/%m/%Y %H:%M:%S') + '| ' + 'Paste #' + str(i) + '| HTTP Response: ' + str(r.status_code) + '| ' + r.text + '\n')
        f.close()

        print(datetime.now().strftime('%d/%m/%Y %H:%M:%S') + '| ' + 'Sleeping for ' + str(timeBetweenPastes) + ' minutes')
        time.sleep(timeBetweenPastes*60)

        i += 1
        if i == 10:
            i = 0

    return 0


main()