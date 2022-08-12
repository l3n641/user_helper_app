<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header>
        </Header>
      </el-header>
      <el-main>
        <router-view>
        </router-view>
      </el-main>
    </el-container>
  </div>


</template>
<script>


import Header from "@/components/framework/Header.vue";

export default {
  components: {Header},
  setup() {

  },
};
</script>
