import { getParams } from './util.js'
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random

const find = function (options) {
  let data = getParams(options.body)
  let arrays = []
  for (let i = 0; i < data.pageSize; i++) {
    let arr = Mock.mock({
      id: Random.id(),
      areaId: Random.id(),
      name: Random.province() + '泵组',
      createAt: 1559271580000,
      createBy: "196",
      deleteFlag: 1,
      status: 1,
      version: Random.pick([0, 8]),
      itemCount: 1,
      groupItems: [{
        areaId: "113",
        equipmentId: "wqeqwr",
        equipmentSn: "wqeqwr",
        groupId: 60,
        id: 108,
        instanceId: 42,
        pumpClass: {
          areaId: "113", 
          version: null, 
          id: 40, 
          modelId: 61, 
          name: "z3_SFWP100-300-z3_196_1559122484524", 
          no: "SFWP100-300-z3",
          pointFlowRate: 834,
          pointHead: 48,
          pointShaftPower: 127,
          pointSpeed: 1480,
          speed: null,
          status: 2,
          typeId: 1,
          typeName: "单级双吸卧式离心泵",
          username: "yf",
        },
        pumpId: 40,
        pumpNo: "1#",
        version: 2,
        workStatus: 1,
        workType: 0
      }]
      
    })
    arrays.push(arr)
  }
  return {
    status: 0,
    message: "success",
    data: {
      data: arrays,
      pageNum: 1,
      pageSize: 5,
      total: 8
    }
  }
}

export default {
  find,
}
