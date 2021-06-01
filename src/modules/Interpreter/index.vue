<template>
  <page-layout>
    <div slot="content" class="interpreter-content">
      <div class="input-row">
        <el-input v-model="inputValue" @keydown.enter.native.stop="executeRow" />
        <el-button type="small" @click="executeRow">ВЫПОЛНИТЬ</el-button>
      </div>

      <div v-if="result" class="result">
        Результат: 
      </div>

      <div class="variables">
        Переменные:
        <div class="variable" v-for="variable in displayedVariables" :key="variable.name">
          {{ `${variable.name}: ${variable.value}` }}
        </div>
      </div>
    </div>
  </page-layout>
</template>

<script>
import PageLayout from "../../components/PageLayout";

export default {
  name: "interpreter",
  components: {
    PageLayout,
  },
  data() {
    return {
      variables: {
        a: 3,
      },
      inputValue: '',
      result: null,
    };
  },
  computed: {
    displayedVariables() {
      const currentVariables = Object.keys(this.variables);
      return currentVariables.map(variable => {
        return {
          name: variable,
          value: this.variables[variable],
        };
      });
    },
  },
  methods: {
    executeRow() {
      const parsedInput = this.parseString(this.inputValue);
      if (!parsedInput) {
        const h = this.$createElement;
        this.$notify({
          title: 'Title',
          message: h('i', { style: 'color: teal' }, 'This is a reminder')
        });
        return;
      }
      console.log('executed', parsedInput);
    },
    parseString(string) {
      const regex = /([0-9a-zA-Z]+) ([+-/%=]) ([0-9a-zA-Z]+)/;
      const match = string.match(regex);

      if (!match) {
        return null;
      }

      return {
        firstOperand: match[1],
        secondOperand: match[3],
        operator: match[2],
      }
    },
  }
};
</script>

<style lang="less" scoped>
.interpreter-content {
  padding: 20px 20px 60px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .input-row {
    display: flex;
    gap: 20px;
  }

  .variables {
    .variable {
      display: flex;
    }
  }
}
</style>
