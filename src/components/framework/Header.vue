<template>
  <div class="header">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
      <el-menu-item index="0" class="logo">数据助手</el-menu-item>
      <div class="flex-grow"/>
      <el-sub-menu index="collectionProduct">
        <template #title>采集数据处理</template>
        <el-menu-item index="product">采集数据整理</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script>

import {useRouter} from "vue-router";
import {ref} from "vue";

export default {
  setup() {
    const router = useRouter();

    let activeIndex = ref("")
    const handleSelect = (index, indexPath) => {
      switch (index) {
        case "product":
          router.push("/product");
          break
      }
    }
    return {
      activeIndex,
      handleSelect
    }

  },
}
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  color: #fff;
}


.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
  margin-left: 50px;
  list-style-type: none;
  font-size: 16px;
}

.flex-grow {
  flex-grow: 1;
}
</style>
