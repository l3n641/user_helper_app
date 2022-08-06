<template>
  <div class="custom-tree-container">
    <el-tree
        :data="dataSource"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <a @click="append(data)"> 添加 </a>
            <a style="margin-left: 8px" @click="remove(node, data)"> 删除 </a>
            <a style="margin-left: 8px" @click="remove(node, data)"> 重命名 </a>
          </span>
        </span>
      </template>
    </el-tree>
  </div>
</template>


<script>
import {reactive, ref} from "vue";

export default {
  name: "Category",
  setup() {
    const query = reactive({
      tableName: null,
    })
    const dataSource = ref([])


    return {
      query,
      dataSource,
    }
  }

}
</script>

<style scoped>

</style>
