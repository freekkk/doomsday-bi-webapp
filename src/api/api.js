/**
 * Created by Administrator on 2017/6/17.
 */
import axios from 'axios'

export const getGameData =params =>{return axios.get('api/gamedata',{params:params})}
