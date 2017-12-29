/**
 * Created by Administrator on 2017/6/17.
 */
import Mock from 'mockjs'

const GameData=[]

for(let i=0;i<100;i++){
  GameData.push(Mock.mock({
    'id': Mock.Random.increment(),
    'serverName': '服务器'+'id',
    'DAU': Mock.Random.integer(50, 200),
    'NUC': Mock.Random.integer(50, 200),
    'NDC': Mock.Random.integer(1, 5000),
    'DRR': Mock.Random.integer(50, 200),
    'WRR': Mock.Random.integer(80, 99),
    'HMRR': Mock.Random.integer(111, 200),
    'MRR': Mock.Random.integer(56, 200),
    'PAC': Mock.Random.integer(202, 555),
    'PU': Mock.Random.integer(2, 200),
    'ARRPU': Mock.Random.integer(41, 500),
    'ARPU': Mock.Random.integer(1, 96),
    'PUR': Mock.Random.integer(52, 415),
    'createDate': Mock.Random.date()
  }))
}

export {GameData}
