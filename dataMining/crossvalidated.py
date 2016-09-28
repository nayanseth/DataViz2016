import requests;
import json;

def encodeASCII(userInput):
    if(type(userInput)==type(list())):
        temp = []
        for i in userInput:
             temp.append(i.encode("ascii","ignore"));
        return temp

    # for backup just in case input contains some int
    elif(type(userInput)==type(int())):
        return userInput

    return userInput.encode("ascii","ignore")

def getResponse():
    #response = requests.get(url);

    #global rData
    rData=[]

    for i in range(1,3):
        response = requests.get("https://api.stackexchange.com/2.2/questions?page="+str(i)+"&pagesize=50&order=desc&sort=creation&tagged=r&site=stats");

        temp = {}

        if(response.ok):
            data = response.json()
            for items in data["items"]:
                for key in items:
                    key = encodeASCII(key);
                    if(key=="view_count"):
                        myKey = "views";
                        temp[myKey] = items[key];
                    elif(key=="score"):
                        myKey = "votes";
                        temp[myKey] = items[key];
                    elif(key=="tags" or key =="title" or key=="closed_reason" or key=="link"):
                        temp[key] = encodeASCII(items[key]);
                    elif(key=="migrated_to" or key=="bounty_closes_date" or key=="bounty_amount" or key=="locked_date"):
                        pass
                    elif(key=="owner"):
                        temp[key] = {}
                        for ownerKey in items[key]:
                            ownerKey = encodeASCII(ownerKey);
                            #print ownerKey
                            if(ownerKey=="profile_image"):
                                pass
                            elif(ownerKey=="user_id" or ownerKey=="reputation" or ownerKey=="accept_rate"):
                                temp[key][ownerKey] = items[key][ownerKey];
                            else:
                                temp[key][ownerKey] = encodeASCII(items[key][ownerKey]);
                    else:
                        temp[key] = items[key]
                #print temp
                rData.append(temp)
                temp = {}
    return rData
#begin main

target = open("data.json", 'w');
target.write(str(getResponse()));
target.close();
