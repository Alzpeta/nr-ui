<template lang="pug">
.column.q-gutter-sm
  multilingual-chips.q-my-none.q-py-none.col(
    ref="keywords"
    v-model="model.keywords"
    :label="$t('label.forms.keywords')"
    @update:model-value="onChange")
  //pre.q-pa-md.q-ma-md.bg-dark.text-white.text-code.rounded-borders {{ {keywords:description.keywords} }}
  subject-category-input.col(
    ref="subjectCategories"
    v-model="model.subjectCategories"
    multiple
    :rules="[required($t('error.validation.required'))]"
    :elasticsearch="false"
    @update:model-value="onChange"
    :label="`${$t('label.subjectCategories')} *`")
  //pre.q-pa-md.q-ma-md.bg-dark.text-white.text-code.rounded-borders {{ {subjectCategories:description.subjectCategories} }}
  multilingual-editor.q-ml-none.q-mt-none.col(
    ref="methods"
    v-model="model.methods"
    @update:model-value="onChange"
    :label="$t('label.methods')")
  //pre.q-pa-md.q-ma-md.bg-dark.text-white.text-code.rounded-borders {{ {methods:description.methods} }}
  multilingual-editor.q-ml-none.q-mt-none.col(
    ref="technicalInfo"
    @update:model-value="onChange"
    v-model="model.technicalInfo"
    :label="$t('label.technicalInfo')")
  //pre.q-pa-md.q-ma-md.bg-dark.text-white.text-code.rounded-borders {{ {technicalInfo:description.technicalInfo} }}
  input-list.q-ml-none.q-my-none.q-py-none.col(
    ref="notes"
    v-model="model.notes"
    @update:model-value="onChange"
    :label="$t('label.notes')")
  //pre.q-pa-md.q-ma-md.bg-dark.text-white.text-code.rounded-borders {{ {notes:description.notes} }}
  stepper-nav.q-mt-xl(has-prev @next="$emit('next')" @prev="$emit('prev')")
</template>
<script>
import {defineComponent, ref} from 'vue'
import useValidation from 'src/composables/useValidation'
import StepperNav from 'components/controls/StepperNav'
import MultilingualChips from 'components/controls/inputs/MultilingualChips'
import TermListSelect from 'components/controls/selects/TermListSelect'
import SubjectCategoryInput from 'components/controls/inputs/SubjectCategoryInput'
import MultilingualEditor from 'components/controls/inputs/MultilingualEditor'
import InputList from 'components/controls/inputs/InputList'
import deepcopy from 'deepcopy'
import useModel from 'src/composables/useModel'

export default defineComponent({
  name: 'DatasetDescription',
  components: {
    InputList,
    StepperNav,
    MultilingualChips,
    MultilingualEditor,
    TermListSelect,
    SubjectCategoryInput
  },
  emits: ['update:modelValue', 'next', 'prev', 'validate'],
  props: {
    modelValue: Object
  },
  setup(props, ctx) {
    const model = ref(deepcopy(props.modelValue))

    const {onChange} = useModel(ctx, model)
    const {required} = useValidation()
    const keywords = ref(null)
    const subjectCategories = ref(null)
    const methods = ref(null)
    const technicalInfo = ref(null)
    const notes = ref(null)

    function validate() {
      const scr = subjectCategories.value.validate()

      if (scr !== true) {
        ctx.emit('validate', false)
      } else {
        ctx.emit('validate', true)
      }
    }

    return {model, required, keywords, subjectCategories, methods, technicalInfo, notes, onChange, validate}
  }
})
</script>
<style lang="sass" scoped>
</style>
