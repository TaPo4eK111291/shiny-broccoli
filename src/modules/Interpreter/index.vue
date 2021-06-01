<template>
  <page-layout>
    <div slot="content" class="interpreter-content">
      <div class="title">
        Решение каты:
        <a
          href="https://www.codewars.com/kata/simpler-interactive-interpreter/javascript"
        >
          https://www.codewars.com/kata/simpler-interactive-interpreter/javascript
        </a>
      </div>
      <div class="hint">
        Для ввода доступны строки вида: variable = 2, test = 5, variable * test
      </div>

      <div class="input-row">
        <el-input
          v-model="inputValue"
          @keydown.enter.native.stop="executeRow"
        />
        <el-button type="small" @click="executeRow">ВЫПОЛНИТЬ</el-button>
      </div>

      <div v-if="result" class="result">Результат: {{ result }}</div>

      <div v-if="hasVariables" class="variables">
        Переменные:
        <div
          class="variable"
          v-for="variable in displayedVariables"
          :key="variable.name"
        >
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
      variables: {},
      inputValue: "",
      result: null,
    };
  },
  computed: {
    displayedVariables() {
      const currentVariables = Object.keys(this.variables);
      return currentVariables.map((variable) => {
        return {
          name: variable,
          value: this.variables[variable],
        };
      });
    },
    hasVariables() {
      return this.displayedVariables.length > 0;
    },
  },
  methods: {
    executeRow() {
      const parsedInput = this.parseString(this.inputValue);
      if (!parsedInput) {
        this.$notify.error({
          title: "Ошибка",
          message: "Проверьте правильность ввода строки",
        });
        return;
      }

      const result = this.executeCommand(parsedInput);
      if (!result) {
        this.notifyError();
        return;
      }

      this.result = result;
    },
    parseString(string) {
      const regex = /([0-9a-zA-Z]+) ([+-/*=]) ([0-9a-zA-Z]+)/;
      const match = string.match(regex);

      if (!match) {
        return null;
      }

      return {
        firstOperand: match[1],
        secondOperand: match[3],
        operator: match[2],
      };
    },
    executeCommand(command) {
      switch (command.operator) {
        case "+":
        case "-":
        case "*":
        case "/":
          return this.doMath(command);
        case "=":
          return this.assignVariable(command);
        default:
          return null;
      }
    },
    isVariable(operand) {
      return isNaN(Number(operand));
    },
    notifyError(message = "Что-то пошло не так") {
      this.$notify.error({
        title: "Ошибка",
        message,
      });
    },
    hasVariable(name) {
      return name in this.variables;
    },
    assignVariable({ firstOperand, secondOperand }) {
      if (this.isVariable(firstOperand) && this.isVariable(secondOperand)) {
        if (this.hasVariable(secondOperand)) {
          this.variables = {
            ...this.variables,
            [firstOperand]: this.variables[secondOperand],
          };
          return this.variables[secondOperand];
        } else {
          return null;
        }
      }

      if (this.isVariable(firstOperand)) {
        this.variables = {
          ...this.variables,
          [firstOperand]: secondOperand,
        };
        return secondOperand;
      }

      return null;
    },
    doMath({ firstOperand, secondOperand, operator }) {
      const firstData = this.getData(firstOperand);
      const secondData = this.getData(secondOperand);

      if (
        this.isNanOrUndefined(firstData) ||
        this.isNanOrUndefined(secondData)
      ) {
        return null;
      }

      return this.calc(firstData, secondData, operator);
    },
    calc(first, second, operator) {
      switch (operator) {
        case "+":
          return first + second;
        case "-":
          return first - second;
        case "*":
          return first * second;
        case "/":
          return first / second;
        default:
          return null;
      }
    },
    getData(operand) {
      const data = this.isVariable(operand) ? this.variables[operand] : operand;
      return Number(data);
    },
    isNanOrUndefined(value) {
      return value === undefined || isNaN(value);
    },
  },
};
</script>

<style lang="less" scoped>
.interpreter-content {
  padding: 20px 20px 60px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .title {
    font-size: 20px;
    font-weight: 600;
  }

  .hint {
    font-size: 12px;
    color: gray;
  }

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
