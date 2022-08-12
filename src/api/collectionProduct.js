import request from '@/utils/request'

export function getProductCategory(tableName) {
    return request({
        url: '/product_category',
        method: 'get',
        params: {
            table_name: tableName
        }
    })
}

export function updateCategory(tableName, oldCategoryName, newCategoryName) {
    return request({
        url: '/product_category',
        method: 'put',
        data: {
            table_name: tableName,
            old_category: oldCategoryName,
            new_category: newCategoryName,
        }
    })
}

export function getProducts(tableName, categoryName) {
    return request({
        url: '/product',
        method: 'get',
        params: {
            table_name: tableName,
            category_name: categoryName,
        }
    })
}

export function batchUpdateProductSize(tableName, productIds, size) {
    return request({
        url: '/product_size',
        method: 'put',
        data: {
            table_name: tableName,
            product_ids: productIds,
            size: size,
        }
    })
}


export function batchUpdateProductCategory(tableName, productIds, category) {
    return request({
        url: '/batch_product_category',
        method: 'put',
        data: {
            table_name: tableName,
            product_ids: productIds,
            category: category,
        }
    })
}


export function deleteProduct(tableName, productIds) {
    return request({
        url: '/delete_product',
        method: 'post',
        data: {
            table_name: tableName,
            product_ids: productIds,
        }
    })
}
