export interface SelectOption {
  text: string;
  value?: string;
}

export interface ComboBoxOption {
  label: string;
  value: string;
  color: string;
}

export interface MetaProperty {
  id: string;
  type: FIELD_TYPES;
  label?: string;
  value?: string | number;
  selectedIndex?: number;
  selectedOptions?: ComboBoxOption[],
  options?: ComboBoxOption[] | SelectOption[];
}

export enum FIELD_TYPES {
  TEXT,
  NUMBER,
  SELECT,
  MULTI_SELECT,
  DATE,
  EMAIL,
  URL,
}
