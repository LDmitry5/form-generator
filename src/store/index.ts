import { createStore } from "vuex";
import type { FormConfig } from "@/types/form";

export default createStore({
  state: {
    formData: {} as Record<string, any>,
    formConfig: {} as FormConfig,
  },
  mutations: {
    SET_FORM_DATA(state, data: Record<string, any>) {
      state.formData = data;
    },
    SET_FORM_CONFIG(state, config: FormConfig) {
      state.formConfig = config;
    },
  },
  actions: {
    loadFormData({ commit }, data: Record<string, any>) {
      commit("SET_FORM_DATA", data);
    },
    loadFormConfig({ commit }, config: FormConfig) {
      commit("SET_FORM_CONFIG", config);
    },
  },
});
