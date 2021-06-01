<template>
  <div class="dictionary">
    <div class="title">{{ `Словарь: [${dictionary.join(", ")}]` }}</div>
    <div class="hint">
      <div class="test" v-for="(test, index) in data.tests" :key="index">
        {{
          `Проверочное слово: ${test.word}. Ожидаемый результат: ${test.result}`
        }}
      </div>
    </div>

    <div class="input-row">
      <el-input v-model="searchQuery" @keydown.enter.native.stop="search" />
      <el-button type="small" @click="search">ИСКАТЬ</el-button>
    </div>

    <div v-if="result" class="result">
      {{ `Наиболее подходящее слово: ${result}` }}
    </div>
  </div>
</template>

<script>
export default {
  name: "dictionary",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      searchQuery: "",
      result: "",
    };
  },
  computed: {
    dictionary() {
      return this.data.dictionary;
    },
  },
  methods: {
    search() {
      this.result = "";
      if (!this.searchQuery) {
        return;
      }

      const differences = this.dictionary.map((word) =>
        this.getWordDifference(word, this.searchQuery)
      );
      const lowestDifference = differences.reduce((a, b) => Math.min(a, b));
      const lowestDifferenceIndex = differences.findIndex(
        (diff) => diff === lowestDifference
      );
      this.result = this.dictionary[lowestDifferenceIndex];
    },
    getWordDifference(word, query) {
      const diffs = [Math.max(word.length, query.length)];
      for (let i = 0, j = -1; i < word.length; i++) {
        while ((j = query.indexOf(word[i], j + 1)) >= 0) {
          diffs.push(
            Math.max(i, j) +
              this.getWordDifference(word.substr(i + 1), query.substr(j + 1))
          );
        }
      }
      return Math.min(...diffs);
    },
  },
};
</script>

<style lang="less" scoped>
.dictionary {
  .title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 7px;
  }

  .hint {
    font-size: 14px;
    margin-bottom: 5px;
  }

  .input-row {
    display: flex;
    gap: 20px;
  }
}
</style>
