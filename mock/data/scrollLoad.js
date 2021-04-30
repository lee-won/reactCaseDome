module.exports = (req, res) => {
  console.log(req.body)
  const pageNum = req.body.pageNum
  let arr = []
  for(let i = (pageNum - 1) * 10; i < pageNum*10; i++) {
    arr.push(i)
  }
  const data = {
    status:0,
    result:arr,
    message:'OK'
  }
  return res.json(data);
}