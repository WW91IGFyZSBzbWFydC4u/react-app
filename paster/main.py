import requests
from datetime import datetime
import time

# Global settings

api_dev_key 		    = 'b563cbb46796f0a788b5cc2243852213'
api_paste_code 		    = ''
api_paste_private 		= '0' # 0=public 1=unlisted 2=private
api_paste_name			= ''
api_paste_expire_date 	= '1H'
api_paste_format 		= ''
api_user_key 			= '' # if an invalid or expired api_user_key is used, an error will spawn. If no api_user_key is used, a guest paste will be created

API_ENDPOINT = 'https://pastebin.com/api/api_post.php'

timeBetweenPastes = 1

# Logfile
logfile = 'C:\Users\Administrator\Documents\proj\AutoPaste.log'

pastes = [
    'test'
    'cryptowallet online\r\nhttp://3.23.70.180\r\nuser:password\r\nbradron85:cryptPW11225',
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
    while i < 1:
        data = defineData(i)
        r = sendPost(data)

        f = open(logfile, "a")
        f.write(datetime.now().strftime('%d/%m/%Y %H:%M:%S') + '| ' + 'Paste #' + str(i) + '| HTTP Response: ' + str(r.status_code) + '| ' + r.text + '\n')
        f.close()

        print(datetime.now().strftime('%d/%m/%Y %H:%M:%S') + '| ' + 'Sleeping for ' + str(timeBetweenPastes) + ' minutes')
        time.sleep(timeBetweenPastes*60)

        i += 1
        if i == 1:
            i = 0

    return 0


main()