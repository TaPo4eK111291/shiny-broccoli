<template>
  <div class="page-layout">
    <div class="header">
      <slot name="header">
        <el-menu
          :default-active="activeIndex"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="Spiral">Спираль</el-menu-item>
          <el-menu-item index="Interpreter">Интерпретатор</el-menu-item>
          <el-menu-item index="TypoHelper">Вы имели в виду ...</el-menu-item>
        </el-menu>
      </slot>
    </div>
    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PageLayout",
  computed: {
    activeIndex() {
      return this.$route.name || "/";
    },
  },
  methods: {
    handleSelect(value) {
      this.$router.push(value || "/");
    },
  },
};
</script>

<style lang="less" scoped>
@content-max-width: 1080px;

.page-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0fff0;

  height: 100vh;

  .content {
    flex: 1 0;
    background-color: white;
    overflow-y: auto;
  }

  .content,
  .header {
    max-width: @content-max-width;
    width: 100%;
  }

  .default-header {
    height: 60px;

    > *:not(:last-child) {
      margin-right: 15px;
    }

    .nav-link {
      font-size: 20px;
      font-weight: 600;

      color: #039dfc;
      text-decoration: none;
    }
  }
}
</style>
