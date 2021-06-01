<template>
  <page-layout>
    <div slot="content" class="typo-content">
      <dictionary
        v-for="(dictionary, index) in dictionaries"
        :data="dictionary"
        :key="index"
      />
    </div>
  </page-layout>
</template>

<script>
import PageLayout from "../../components/PageLayout";
import Dictionary from "./_components/Dictionary";

export default {
  name: "typo-helper",
  components: {
    PageLayout,
    Dictionary,
  },
  data() {
    return {
      dictionaries: [
        ["cherry", "pineapple", "melon", "strawberry", "raspberry"],
        ["stars", "mars", "wars", "codec", "codewars"],
        ["javascript", "java", "ruby", "php", "python", "coffeescript"],
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.typo-content {
  padding: 20px 20px 60px 20px;
  display: flex;
  flex-direction: column;
}
</style>
