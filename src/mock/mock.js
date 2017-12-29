/**
 * Created by Administrator on 2017/6/13.
 */
import Mock from 'mockjs'
import {GameData} from './data'

export  default {
  mockData() {
    Mock.mock('/api/user', {
      "code": "000",
      "datas": {
        "name": "admin",
        "area": "@fuck off",
        "identity": "超级"
      }
    }),
    // Mock.mock('/api/gamedata', {
    //   'datas|10': [{
    //     'id|+1': 1,
    //     'serverName': Mock.Random.cname(),
    //     'DAU': Mock.Random.integer(50, 200),
    //     'NUC': Mock.Random.integer(50, 200),
    //     'createDate': Mock.Random.date()
    //   }]
    // })
    Mock.mock('/api/gamedata', {
      'datas':GameData
    })
  }
}
