<template>
  <div class="page-content">schedule
  </div>
</template>
<script>
// import { mapState } from 'vuex'
import { table } from '@/mixins/table'
import ViewOperate from '@/components/logs/viewOperate'
export default {
  name: 'schedule',
  mixins: [table],
  data () {
    return {
      type: '全部',
      search: {
      }
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  },
  components: {
    ViewOperate
  }
}
</script>

<style scoped lang="less">
.content{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
