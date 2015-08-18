module.exports = {
  contact: contact
}

function contact(req, res){
  CreateIssue.call(req, function(err){
    err ? res.serverError(err) : res.ok();
  });
}
