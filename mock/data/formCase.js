module.exports = (req, res) => {
  console.log(req.body)
  const data = {
    status:0,
    result:null,
    message:'OK'
  }
  return res.json(data);
}