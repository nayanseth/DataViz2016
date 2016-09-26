# This package will contain the spiders of your Scrapy project
#
# Please refer to the documentation for information on how to create and manage
# your spiders.

import scrapy


class StackOverFlowSpider(scrapy.Spider):
    name = "stackoverflow"

    def start_requests(self):
        urls = [
            'http://stackoverflow.com/questions/tagged/r?sort=newest&pagesize=50',
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        main = response.css("div.question-summary")
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

        #print finalData;

        #page = response.url.split("/")[-2]
        #filename = 'quotes-%s.html' % page
        '''
        with open(filename, 'wb') as f:
            f.write(response.body)
        self.log('Saved file %s' % filename)
        '''
