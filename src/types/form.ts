export interface FormField {
  type: "input" | "select" | "checkbox" | "textarea";
  label: string;
  name: string;
  value?: any;
  options?: { value: any; label: string }[];
  attrs?: Record<string, any>;
}

export interface FormConfig {
  fields: FormField[];
}
