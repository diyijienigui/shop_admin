import request from '@/utils/request'


/**
 *获取统计面板数据
 *这里数据只有一个页面在用，所以不使用model
 * @export
 */
export function fetchDashboard(){
    return request('/admin/index');
}