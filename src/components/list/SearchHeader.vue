<template lang="pug">
div.q-pa-md.q-pr-lg.search-header
  .row.full-width
    search-box()
  .row.justify-between.q-mt-lg.items-baseline
    .row.q-gutter-sm.col-auto
      .label Výsledků:
      .text-weight-bold {{ collection.recordsCountString }}
    .row.q-gutter-sm.col-grow.q-px-lg
      .label.col-auto Řazení:
      q-select.short.col-grow(dense outlined square :options="orderingOptions"
        emit-value map-options v-model="$query.sort")
    .row.q-gutter-sm.col-auto
      .label Počet na stránku:
      q-select.short(dense outlined square :options="pageSizeOptions" v-model="$query.size")
  .row.q-pt-lg
    URLPagination(:pages="collection.pages")
</template>
<script>
import {Options, Vue} from 'vue-class-component'
import SearchBox from 'src/components/controls/SearchBox'
import URLPagination from 'src/components/controls/URLPagination'
import BaseSelect from "components/controls/selects/BaseSelect";


export default @Options({
  name: 'SearchHeader',
  components: {
    SearchBox,
    URLPagination,
    BaseSelect
  },
  props: {
    collection: Object
  }
})
class SearchHeader extends Vue {

  get orderingOptions() {
    return [
      {
        label: 'Abecední dle názvu',
        value: 'alphabetical'
      },
    ]
  }

  get pageSizeOptions() {
    return [10, 20, 50, 100, 500]
  }
}
</script>
