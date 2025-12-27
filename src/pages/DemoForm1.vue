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
          label: "Имя",
          name: "name",
          attrs: { placeholder: "Введите имя" },
        },
        {
          type: "input",
          label: "Email",
          name: "email",
          attrs: { type: "email", placeholder: "Введите email" },
        },
        {
          type: "select",
          label: "Role",
          name: "role",
          options: [
            { value: "user", label: "Пользователь" },
            { value: "admin", label: "Администратор" },
            { value: "moderator", label: "Модератор" },
          ],
        },
        {
          type: "checkbox",
          label: "Согласен с условиями",
          name: "agree",
        },
        {
          type: "textarea",
          label: "Комментарии",
          name: "comments",
          attrs: { rows: 4, placeholder: "Оставьте комментарий" },
        },
      ],
    };

    const onSubmit = (data: Record<string, any>) => {
      console.log("Форма отправлена:", data);
      alert("Данные сохранены!");
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
    <h2>Демо‑форма 1: Настройки профиля</h2>
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

.custom-email-input {
  border: 2px solid #007bff;
  padding: 10px;
  border-radius: 6px;
}
</style>
