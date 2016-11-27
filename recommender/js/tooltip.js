$(document).ready(function(){
    $('#votes-text').qtip({
        content: 'Specify number of votes',
        show: {
            when: 'mouseover', // Don't specify a show event
            ready: true, // Show the tooltip when ready
            delay: 500
        },
        hide: {
                event: 'click',
                target: $('body', this)
        }
    })

    $('#views-text').qtip({
        content: 'Specify number of views',
        show: {
            when: false, // Don't specify a show event
            ready: true, // Show the tooltip when ready
            delay: 500
        },
        hide: {
                event: 'click',
                target: $('body', this)
        }
    })

    $('#answers-text').qtip({
        content: 'Specify number of answers',
        show: {
            when: false, // Don't specify a show event
            ready: true, // Show the tooltip when ready
            delay: 500
        },
        hide: {
                event: 'click',
                target: $('body', this)
        }
    })

});
