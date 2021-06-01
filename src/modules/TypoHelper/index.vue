<template>
  <page-layout>
    <div slot="content" class="typo-content">
      <div class="title">
        Решение каты:
        <a
          href="https://www.codewars.com/kata/did-you-mean-dot-dot-dot/javascript"
        >
          https://www.codewars.com/kata/did-you-mean-dot-dot-dot/javascript
        </a>
      </div>

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
        {
          dictionary: [
            "cherry",
            "pineapple",
            "melon",
            "strawberry",
            "raspberry",
          ],
          tests: [
            {
              word: "strawbery",
              result: "strawberry",
            },
            {
              word: "berry",
              result: "cherry",
            },
          ],
        },
        {
          dictionary: ["stars", "mars", "wars", "codec", "codewars"],
          tests: [
            {
              word: "coddwars",
              result: "codewars",
            },
          ],
        },
        {
          dictionary: [
            "javascript",
            "java",
            "ruby",
            "php",
            "python",
            "coffeescript",
          ],
          tests: [
            {
              word: "heaven",
              result: "java",
            },
            {
              word: "javascript",
              result: "javascript",
            },
          ],
        },
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
  gap: 20px;

  .title {
    font-size: 20px;
    font-weight: 600;
  }
}
</style>
