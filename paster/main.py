import requests
from datetime import datetime
import time

# Global settings

api_dev_key 		    = 'hCjIanWoiv_u_5azTTyiU25ySMnHnvK2'
api_paste_code 		    = ''
api_paste_private 		= '0' # 0=public 1=unlisted 2=private
api_paste_name			= 'Untitled'
api_paste_expire_date 	= '1H'
api_paste_format 		= 'json'
api_user_key 			= '357e3016842621981fa9d82fe2c41fd3' # if an invalid or expired api_user_key is used, an error will spawn. If no api_user_key is used, a guest paste will be created

API_ENDPOINT = 'https://pastebin.com/api/api_post.php'

timeBetweenPastes = 145

# Logfile
logfile = 'C:\\Users\\Administrator\\Documents\\proj\\AutoPaste.log'

pastes = [
    '{\r\n\tl: "3 . 23.70 . 180"\r\n\tp: "80"\r\n\ta: {\r\n\t\tu:"bradron85"\r\n\t\tp:"cryptPW11225"\r\n}'
]

def sendPost(data):
    r = requests.post(url=API_ENDPOINT, data=data)
    return r

def defineData(i):

    data = {'api_dev_key': api_dev_key,
            'api_option': 'paste',
            'api_paste_code': pastes[i],
            'api_paste_private': api_paste_private,
            'api_paste_expire_date': api_paste_expire_date,
            'api_user_key': api_user_key,
            'api_paste_format': api_paste_format,
            'api_paste_name': api_paste_name
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