<template>
  <div class="dictionary">
    {{ data }}
  </div>
</template>

<script>
export default {
  name: "dictionary",
  props: {
    data: Array,
  },
};
</script>
