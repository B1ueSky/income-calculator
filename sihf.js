/**
 * 五险一金 module
 * Created by Tianyou Luo on 9/18/16.
 */

/**
 * Constructor
 *
 * @param csvFilePath
 * @constructor
 */
function Sihf(csvFilePath)
{
  this.csvFile = csvFilePath;
  var fs = require('fs');
  this.rates = {};

  const fileContents = fs.readFileSync(this.csvFile);
  const lines    = fileContents.toString().split('\n');
  const header   = lines[0].toString().split(',');
  const company  = lines[1].toString().split(',');
  const employee = lines[2].toString().split(',');

  for (var i = 1; i < header.length; i++) {
    this.rates[header[i]] = [
      Number(company[i]),
      Number(employee[i]),
    ]
  }
}

function getSihf(hfRate, income)
{
  const endowment0 = income * this.rates['养老保险'][0],
        endowment1 = income * this.rates['养老保险'][1];

  const medicare0 = income * this.rates['医疗保险'][0],
        medicare1 = income * this.rates['医疗保险'][1];

  const unemployment0 = income * this.rates['失业保险'][0],
        unemployment1 = income * this.rates['失业保险'][1];

  const maternity0 = income * this.rates['生育保险'][0],
        maternity1 = income * this.rates['生育保险'][1];

  const injury0 = income * this.rates['工伤保险'][0],
        injury1 = income * this.rates['工伤保险'][1];

  const housing0 = income * hfRate,
        housing1 = income * hfRate;

  const total0 = endowment0 + medicare0 + unemployment0 + maternity0 + injury0 + housing0,
        total1 = endowment1 + medicare1 + unemployment1 + maternity1 + injury1 + housing1;

  return [
    {'类型':'养老', '单位':endowment0.toFixed(2), '个人':endowment1.toFixed(2)},
    {'类型':'医疗', '单位':medicare0.toFixed(2), '个人':medicare1.toFixed(2)},
    {'类型':'失业', '单位':unemployment0.toFixed(2), '个人':unemployment1.toFixed(2)},
    {'类型':'生育', '单位':maternity0.toFixed(2), '个人':maternity1.toFixed(2)},
    {'类型':'工伤', '单位':injury0.toFixed(2), '个人':injury1.toFixed(2)},
    {'类型':'住房', '单位':housing0.toFixed(2), '个人':housing1.toFixed(2)},
    {'类型':'总计', '单位':total0.toFixed(2), '个人':total1.toFixed(2)},
  ];
}

Sihf.prototype.getSihf = getSihf;
module.exports = Sihf;