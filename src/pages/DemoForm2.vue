<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import FormGenerator from "@/components/FormGenerator.vue";
import type { FormConfig } from "@/types/form";

export default defineComponent({
  components: { FormGenerator },
  setup() {
    const store = useStore();

    const formData = computed({
      get() {
        return store.state.formData;
      },
      set(value) {
        store.dispatch("loadFormData", value);
      },
    });

    const formConfig: FormConfig = {
      fields: [
        {
          type: "input",
          label: "Имя пользователя",
          name: "username",
          attrs: { placeholder: "Введите имя пользователя" },
        },
        {
          type: "select",
          label: "Тема интерфейса",
          name: "theme",
          options: [
            { value: "light", label: "Светлая" },
            { value: "dark", label: "Тёмная" },
            { value: "auto", label: "Автоматическая" },
          ],
        },
        {
          type: "checkbox",
          label: "Получать уведомления",
          name: "notifications",
        },
        {
          type: "textarea",
          label: "О себе",
          name: "bio",
          attrs: { rows: 3, placeholder: "Расскажите о себе" },
        },
      ],
    };

    const onSubmit = (data: Record<string, any>) => {
      console.log("Настройки профиля сохранены:", data);
      alert("Настройки обновлены!");
    };

    const onCancel = () => {
      console.log("Отмена заполнения формы");
      store.dispatch("loadFormData", {
        name: "",
        email: "",
        role: "",
        agree: false,
        comments: "",
      });
    };

    return {
      formData,
      formConfig,
      onSubmit,
      onCancel,
    };
  },
});
</script>

<template>
  <div class="demo-form">
    <h2>Демо‑форма 2: Настройки профиля</h2>
    <FormGenerator :config="formConfig" :modelValue="formData" @submit="onSubmit" @cancel="onCancel">
      <!-- Кастомизация поля 'theme' -->
      <template #theme="{ field, value, updateValue }">
        <div class="theme-options">
          <label v-for="option in field.options" :key="option.value">
            <input
              type="radio"
              :value="option.value"
              :checked="value === option.value"
              @input="updateValue(option.value)" />
            {{ option.label }}
          </label>
        </div>
      </template>
    </FormGenerator>
  </div>
</template>

<style lang="scss" scoped>
.demo-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.theme-options {
  display: flex;
  gap: 15px;
  margin-top: 10px;

  label {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }
}
</style>
