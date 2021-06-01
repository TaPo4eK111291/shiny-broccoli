<template>
  <page-layout>
    <div slot="content" class="spiral-content">
      <div class="title">
        Решение каты:
        <a href="https://www.codewars.com/kata/make-a-spiral/javascript">
          https://www.codewars.com/kata/make-a-spiral/javascript
        </a>
      </div>
      <div class="hint">
        {{
          `Для корректного отображения рекомендуются матрицы от ${MIN_MATRIX_SIZE} до 63.`
        }}
      </div>

      <div class="input-row row">
        <el-input-number
          v-model="matrixSize"
          :min="MIN_MATRIX_SIZE"
          :max="MAX_MATRIX_SIZE"
          class="matrix-size-input"
          @change.native="createSpiral"
        />
        <el-button type="small" @click="createSpiral">СОЗДАТЬ</el-button>
      </div>

      <div class="result-block">
        <div v-for="(row, index) in matrix" :key="index">
          {{ row }}
        </div>
      </div>
    </div>
  </page-layout>
</template>

<script>
import PageLayout from "../../components/PageLayout";

const MIN_MATRIX_SIZE = 5;
const MAX_MATRIX_SIZE = 1000;

export default {
  name: "spiral",
  components: {
    PageLayout,
  },
  data() {
    return {
      matrixSize: MIN_MATRIX_SIZE,
      MIN_MATRIX_SIZE,
      MAX_MATRIX_SIZE,

      matrix: null,
    };
  },
  methods: {
    createSpiral() {
      this.matrix = this.createSquareMatrix(this.matrixSize);
      this.fillMatrix();
    },
    createSquareMatrix(size, value = 0) {
      const result = [];
      for (let index = 0; index < size; index++) {
        result.push(new Array(size).fill(value, 0, size));
      }
      return result;
    },
    printToMatrix(row, column, value = 1) {
      this.matrix[row][column] = value;
    },
    fillMatrix(value = 1) {
      let top = 0;
      let left = 0;
      let bottom = this.matrixSize - 1;
      let right = this.matrixSize - 1;

      let direction = "toRight";

      while (right >= left && top <= bottom) {
        switch (direction) {
          case "toRight":
            for (let index = left; index <= right; index++) {
              this.printToMatrix(top, index, value);
            }
            top += 1;
            left += left === 0 ? 0 : 1; // used to first "near walls" rows with 0 spaces, after first cycle need to use additional space
            direction = "toBottom";
            break;
          case "toBottom":
            for (let index = top; index <= bottom; index++) {
              this.printToMatrix(index, right, value);
            }
            right -= 1;
            top += 1;
            direction = "toLeft";
            break;
          case "toLeft":
            for (let index = right; index >= left; index--) {
              this.printToMatrix(bottom, index, value);
            }
            bottom -= 1;
            right -= 1;
            direction = "toTop";
            break;
          case "toTop":
            for (let index = bottom; index >= top; index--) {
              this.printToMatrix(index, left, value);
            }
            left += 1;
            bottom -= 1;
            direction = "toRight";
            break;
          default:
            break;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.spiral-content {
  padding: 20px 20px 60px 20px;
  display: flex;
  flex-direction: column;

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
    margin-top: 15px;

    .matrix-size-input {
      width: 300px;
    }
  }

  .result-block {
    margin-top: 15px;
  }
}
</style>
