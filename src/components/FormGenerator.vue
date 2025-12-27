<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import type { PropType } from "vue";
import type { FormConfig } from "@/types/form";

export default defineComponent({
  props: {
    config: {
      type: Object as PropType<FormConfig>,
      required: true,
    },
    modelValue: {
      type: Object as PropType<Record<string, any>>,
      required: true,
    },
  },
  emits: ["submit", "cancel", "update:modelValue"],
  setup() {
    const store = useStore();
    return { store };
  },
  computed: {
    formData: {
      get() {
        return this.modelValue;
      },
      set(value: Record<string, any>) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", this.formData);
      this.store.dispatch("loadFormData", this.formData);
    },
    handleCancel() {
      this.$emit("cancel");
    },
  },
});
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form-generator">
    <div
      v-for="field in config.fields"
      :key="field.name"
      class="form-field"
      :class="field.type === 'checkbox' && 'form-checkbox'">
      <label :for="field.name" class="form-label">{{ field.label }}</label>

      <!-- Input -->
      <input
        v-if="field.type === 'input'"
        :id="field.name"
        :type="field.attrs?.type || 'text'"
        v-model="formData[field.name]"
        v-bind="field.attrs" />

      <!-- Select -->
      <select v-else-if="field.type === 'select'" :id="field.name" v-model="formData[field.name]" v-bind="field.attrs">
        <option v-for="option in field.options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <!-- Checkbox -->
      <input
        v-else-if="field.type === 'checkbox'"
        :id="field.name"
        type="checkbox"
        v-model="formData[field.name]"
        v-bind="field.attrs" />

      <!-- Textarea -->
      <textarea
        v-else-if="field.type === 'textarea'"
        :id="field.name"
        v-model="formData[field.name]"
        v-bind="field.attrs"></textarea>

      <!-- Кастомизация через слоты -->
      <slot :name="field.name" :field="field" :value="formData[field.name]"></slot>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn btn-primary">Сохранить</button>
      <button type="button" @click="handleCancel" class="btn btn-secondary">Отмена</button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.form-generator {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
}

.form-field {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2d3748;
  text-align: start;
}

.form-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;

  & label {
    margin-bottom: 0;
  }
  & input {
    width: auto;
  }
}

input,
select,
textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #fff;
  transition: all 0.2s ease;
  font-size: 1rem;
  box-sizing: border-box;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }

  &:disabled {
    background-color: #f7fafc;
    color: #718096;
    cursor: not-allowed;
  }
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%23a0aec0' d='M4.516 7.75l7.071 7.07 7.071-7.07-7.071-7.07z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 0.8rem;
  padding-right: 2rem;
}

textarea {
  resize: vertical;
  min-height: 8rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &-primary {
    background-color: #4299e1;
    color: white;

    &:hover {
      background-color: #3182ce;
    }

    &:disabled {
      background-color: #cbd5e0;
      color: #718096;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  }

  &-secondary {
    background-color: #e2e8f0;
    color: #2d3748;

    &:hover {
      background-color: #cbd5e0;
    }

    &:disabled {
      background-color: #f7fafc;
      color: #a0aec0;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  }
}

// Дополнительные состояния и эффекты
.form-field.has-error {
  input,
  select,
  textarea {
    border-color: #e53e3e;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
  }
}

.form-field.is-focused {
  input,
  select,
  textarea {
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  }
}
</style>
