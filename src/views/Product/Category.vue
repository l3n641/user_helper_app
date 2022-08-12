<template>
  <div class="custom-tree-container">
    <el-tree
        :data="dataSource"
        node-key="full_name"
        default-expand-all
        :expand-on-click-node="false"
        @node-click="changeCategory"
    >
      <template #default="{ node, data }">
         <span class="custom-tree-node">
          <span>{{ filterLabelName(node.label) }}({{ data.quantity }})</span>
          <span>
            <el-link type="primary" @click.stop.prevent class="action_group"
                     @click="handleUpdateCategory(data)">更新</el-link>
          </span>
        </span>
      </template>
    </el-tree>


  </div>
</template>


<script>
import {reactive, ref, watch} from "vue";
import {getProductCategory, updateCategory} from "../../api/collectionProduct";
import {ElMessage, ElMessageBox} from 'element-plus'

export default {
  name: "Category", props: {
    table: String,
  },
  emits: ["changeCategory"],
  setup(props, context) {
    const query = reactive({
      tableName: null,
    })
    const dataSource = ref([])
    const getCategory = (tableName) => {
      getProductCategory(tableName).then(res => {
        dataSource.value = res
      })
    }
    const defaultExpandedKeys = ref(dataSource)

    const handleUpdateCategory = (data) => {
      ElMessageBox.prompt('请输入新的产品类别', 'Tip', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputValue: data.full_name
      }).then(({value}) => {
        updateCategory(props.table, data.full_name, value).then(res => {
          ElMessage.success("更新成功")
          getCategory(props.table)
        })

      })
    }
    const filterLabelName = (name) => {
      if (name.length > 20) {
        return name.slice(0, 20) + "..."
      }
      return name
    }

    const changeCategory = (treeNode, attribute, event) => {
      context.emit("changeCategory", treeNode, attribute, event)
    }
    watch(() => props.table, (newValue, oldValue) => {
      getCategory(newValue)
    })
    return {
      query,
      handleUpdateCategory,
      filterLabelName,
      changeCategory,
      dataSource,
      defaultExpandedKeys
    }
  }

}
</script>

<style scoped>
.custom-tree-container {
  font-size: 12px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  padding-right: 8px;
}

.action_group {
  margin-left: 8px;
  font-size: 10px;

}
</style>
