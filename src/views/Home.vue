<template>
  <div class="about">
    <Header>
    </Header>
    <div class="content-box">

      <div class="content">
        <router-view>
        </router-view>
      </div>
    </div>
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
