<template>
  <el-row>
    <el-col :span="4" class="top">
      <el-select v-model="selectedTable" filterable placeholder="选择要编辑的表" class="tableSelector">
        <el-option
            v-for="item in tables"
            :key="item.TableName"
            :label="item.TableName"
            :value="item.TableName"
        />
      </el-select>
    </el-col>
    <el-col :span="4" class="top">
      <el-input v-model="sizeTemplate" placeholder="批量修改尺码" class="top_input"/>
      <el-button type="warning" class="top_button" @click="handleUpdateProductSize">修改</el-button>
    </el-col>
    <el-col :span="5" class="top">
      <el-input v-model="categoryTemplate" placeholder="批量修改产品分类" class="top_input"/>
      <el-button type="warning" class="top_button" @click="handleUpdateProductCategory">修改</el-button>
    </el-col>
    <el-col :span="3" class="top">
      <el-button type="danger" class="button_delete_product" @click="handleDeleteProduct">删除产品</el-button>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="4">
      <Category :table="selectedTable" @changeCategory="changeCategory"></Category>
    </el-col>
    <el-col :span="20" class="product_list">
      <el-row class="table_product_head">
        <el-col :span="2">
          spu
        </el-col>
        <el-col :span="4">
          Name
        </el-col>
        <el-col :span="4">
          主图
        </el-col>
        <el-col :span="4">
          价格(现价/原价)
        </el-col>
        <el-col :span="4">
          尺码
        </el-col>
      </el-row>
      <el-checkbox-group v-model="selectedProductIds">
        <el-row v-for="product in products" class="table_product_body">
          <el-col :span="2">
            <el-checkbox :label="product.id"/>
          </el-col>
          <el-col :span="5">

          </el-col>
          <el-col :span="4">
            <el-image class="main_picture" :src="getMainPicture(product.pictures)" loading="lazy"/>
          </el-col>
          <el-col :span="4">
            <el-tag>{{ product.d_price }}</el-tag>
            --
            <el-tag type="danger">{{ product.price }}</el-tag>
          </el-col>
          <el-col :span="6">
            <el-input v-model="product.size" placeholder="请输入尺码"/>
          </el-col>
          <el-col :span="3">
            <el-link :href="product.site_url" :disabled="!product.site_url">查看原链接</el-link>
          </el-col>
        </el-row>
      </el-checkbox-group>
    </el-col>
  </el-row>

</template>

<script>
import Category from "./Category";
import {ref} from "vue";
import {getProductTable} from "../../api/table";
import {getProducts, batchUpdateProductCategory, batchUpdateProductSize, deleteProduct} from "@/api/collectionProduct";
import {ElMessage} from 'element-plus'

export default {
  name: "Product",
  components: {Category},
  setup() {
    const selectedTable = ref("")
    const selectedProducts = ref([])
    const selectedProductIds = ref([])
    const sizeTemplate = ref("")
    const categoryTemplate = ref("")
    const currentFullCategory = ref("")
    const products = ref([])
    const tables = ref([])
    const getTables = () => {
      getProductTable().then(res => {
        tables.value = res
      })
    }
    const changeCategory = (treeNode, attribute, event) => {
      getProducts(selectedTable.value, treeNode.full_name).then((res) => {
        products.value = res
      })
      categoryTemplate.value = treeNode.full_name
      currentFullCategory.value = treeNode.full_name
    }
    const handleSelectionChange = (val) => {
      selectedProducts.value = val
    }
    const getPictures = (picturesStr) => {
      if (picturesStr) {
        return picturesStr.split("|||")
      }
      return []
    }
    const getMainPicture = (picturesStr) => {
      const images = getPictures(picturesStr)
      if (images.length > 0) {
        return images[0]
      }
      return ""
    }
    const handleUpdateProductSize = () => {
      let productIds = []
      for (const product of selectedProducts.value) {
        productIds.push(product.id)
      }
      if (productIds.length < 1) {
        ElMessage.warning("请选择要更新的产品")
        return false
      }

      batchUpdateProductSize(selectedTable.value, productIds, sizeTemplate.value).then(res => {
        ElMessage.success("更新成功")
      })
    }
    const handleUpdateProductCategory = () => {
      let productIds = []
      for (const product of selectedProducts.value) {
        productIds.push(product.id)
      }
      if (productIds.length < 1) {
        ElMessage.warning("请选择要更新的产品")
        return false
      }

      if (!categoryTemplate.value) {
        ElMessage.warning("分类不能为空")
        return false
      }

      batchUpdateProductCategory(selectedTable.value, productIds, categoryTemplate.value).then(res => {
        ElMessage.success("更新成功")
      })
    }

    const handleDeleteProduct = () => {
      let productIds = []
      for (const product of selectedProducts.value) {
        productIds.push(product.id)
      }
      if (productIds.length < 1) {
        ElMessage.warning("请选择要删除的产品")
        return false
      }
      deleteProduct(selectedTable.value, productIds).then(res => {
        ElMessage.success("删除成功")
      })
    }

    getTables()
    return {
      selectedTable,
      sizeTemplate,
      categoryTemplate,
      tables,
      selectedProducts,
      products,
      selectedProductIds,
      changeCategory,
      handleSelectionChange,
      getMainPicture,
      handleUpdateProductSize,
      handleUpdateProductCategory,
      handleDeleteProduct,
    }
  }
}
</script>

<style scoped>
.top {
  margin: 5px 0px;
}

.tableSelector {
  width: 300px
}

.product_list {
  border: #97a8be 1px solid;
}

.main_picture {
  height: 100px;
  width: 100px;
}

.top_input {
  width: 70%;
}

.top_button {
  margin-left: 5px;
}

.table_product_head {
  margin-bottom: 5px;
  text-align: center
}

.table_product_body {
  text-align: center;
  border-top-style: dotted;
}
</style>

