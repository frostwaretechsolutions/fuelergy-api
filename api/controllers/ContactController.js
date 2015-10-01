module.exports = {
  contact: contact
}

function contact(req, res){
  CreateIssue.call(req, function(err, issue){
    err ? res.serverError(err) : SlackMessage.call(req, issue, function(err){
     err ? res.serverError(err) : res.ok();
    });
  });
}
