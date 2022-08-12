import request from '@/utils/request'

export function getProductTable() {
    return request({
        url: '/table',
        method: 'get',

    })
}
