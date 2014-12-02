var inbox = [];
window.setInterval(function() {
    var reddit = $.ajax({
        url: // insert "unread messages" json feed from https://www.reddit.com/prefs/feeds/
        success: function(data) {
            for (i = 0; i < data.data.children.length; ++i) {
                if ($.inArray(data.data.children[i].data.id, inbox) == -1) {
                  if (data.data.children[i].kind == 't4') {
                      var text = data.data.children[i].data.author + ' Sent to you:\n\n' + data.data.children[i].data.body
                  } else if (data.data.children[i].kind == 't1') {
                      var text = data.data.children[i].data.author + ' Replied to you:\n\n' + data.data.children[i].data.body
                  }
                    var n = new Notification('Reddit Notification', {
                        body: text
                    });
                    n.onclick = function() {
                        window.open('https://reddit.com/message/inbox', '_newtab')
                    };
                    inbox.push(data.data.children[i].data.id)
                }
            }
        },
    });
    console.log(inbox)
}, 5000);
