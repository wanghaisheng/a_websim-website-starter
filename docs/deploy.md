https://www.jcchouinard.com/google-indexing-api-with-python/


how to get google index service.json

https://github.com/goenning/google-indexing-script/issues/2

Go to IAM & Admin, click on "Service Accounts."

Select your service account, click on the "Keys" tab.

Add a new key, choose "Create new key."

Set "Key type" to "JSON" and click "Create."

Download the JSON file prompted by your browser.


base64 service_account.json > service_account.json.base64


save repo secret as SERVICE_ACCOUNT_JSON
