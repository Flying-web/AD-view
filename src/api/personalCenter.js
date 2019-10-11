// 个人中心 api
import request from '../utils/request'
/* 广告中心 */
// 分页查询广告中心订单
export function getAdvOrderList(formQuery) {
  return request({
    url: '/adv/getAdvOrderList',
    method: 'post',
    data: {
      account: formQuery.account, // 账户信息
      pageNum: formQuery.pageNum, // 分页
      pageSize: formQuery.pageSize // 分页
    }
  })
}
// 根据订单id查询订单下的mcn
export function getAdvOrderDetailMcn(formQuery) {
  return request({
    url: '/adv/getAdvOrderDetailMcn', // /adv/getAdvOrderDetailMcn mock接口
    method: 'post',
    data: {
      orderId: formQuery.orderId, // 订单id
      pageNum: formQuery.pageNum, // 分页
      pageSize: formQuery.pageSize // 分页
    }
  })
}
// 分页获取广告订单详情
export function getOrderDetail(formQuery) {
  return request({
    url: '/adv/orderDetail',
    method: 'post',
    data: {
      orderId: formQuery.orderId, // orderId
      mcnId: formQuery.mcnId, // mcnIdid
      pageNum: formQuery.pageNum, // 分页
      pageSize: formQuery.pageSize // 分页
    }
  })
}

// 退出登录
export function advLogout(formQuery) {
  return request({
    url: '/adv/logout',
    method: 'post',
    data: {
    }
  })
}