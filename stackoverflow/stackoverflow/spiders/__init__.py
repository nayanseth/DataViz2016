# This package will contain the spiders of your Scrapy project
#
# Please refer to the documentation for information on how to create and manage
# your spiders.

import scrapy
import json

list=[]

class StackOverFlowSpider(scrapy.Spider):
    name = "stackoverflow"
    output = open("/Users/nayan/Desktop/dataNew.json","w")
    def start_requests(self):

        file = open("/Users/nayan/Desktop/data.json","r")
        jsonData = json.load(file)
        for value in jsonData:
            yield scrapy.Request(url=value["link"], callback=self.parse)
            print "YESSSSS"
            print list
            break

    def parse(self, response):
        main = response.xpath('//div[@class="post-text"]/p/text()').extract_first().encode("ascii","ignore")
        print main
        list.append(main)
        output.write(main + "\n")


        '''
        finalData = [];
        data = {}
        i = 0;
        for question in main:
            data["title"] = question.css("a.question-hyperlink::text")[0].extract().encode("ascii","ignore")
            data["votes"] = question.css("span.vote-count-post").css("strong::text")[0].extract().encode("ascii","ignore")
            data["answers"] = question.css(".status").css("strong::text")[0].extract().encode("ascii","ignore")
            answerValue = question.css(".status").xpath("@class")[0].extract().encode("ascii","ignore")

            if answerValue=="status answered":
                data["accepted"] = 0;
                data["answered"] = 1;
            elif answerValue=="status answered-accepted":
                data["accepted"] = 1;
                data["answered"] = 1;
            if answerValue=="status unanswered":
                data["accepted"] = 0;
                data["answered"] = 0;

            views = question.css("div.views::text")[0].extract().encode("ascii","ignore").strip();
            views = views.split(" ")[0];
            data["views"] = (int)(views);
            print data
            finalData.append(data);
        '''

        #print finalData;

        #page = response.url.split("/")[-2]
        #filename = 'quotes-%s.html' % page
        '''
        with open(filename, 'wb') as f:
            f.write(response.body)
        self.log('Saved file %s' % filename)
        '''
