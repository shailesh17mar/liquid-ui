import {
  EuiFieldText,
  EuiFieldNumber,
  EuiSelect,
  EuiComboBox,
  EuiDatePicker,
  IconType,
  EuiComboBoxOptionOption,
} from "@elastic/eui";
import moment from "moment";
import { Moment } from "moment";
import { AiOutlineNumber } from "react-icons/ai";
import { BsCalendar2Date } from "react-icons/bs";
import { HiOutlineSelector, HiOutlineExternalLink } from "react-icons/hi";
import { MdTextFields, MdBusiness, MdOutlineMail } from "react-icons/md";
import { SiCurl } from "react-icons/si";
import { CompanyFinder } from "./company-finder";

export interface SelectOption {
  text: string;
  value?: string;
}

export interface FIELD_FORM {
  icon: IconType;
  label: string;
  placeholder: string;
  component: React.FC<PrimitiveValue | ComplexValue>;
}

export interface ComboBoxOption {
  label: string;
  value: string;
  color?: string;
}

export interface MetaProperty {
  id: string;
  type: FIELD_TYPES;
  position: number;
  label: string;
  value?: string | number;
  selectedIndex?: number;
  selectedOptions?: ComboBoxOption[];
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
  COMPANY,
}

export interface PrimitiveValue {
  value?: string | number;
  selectedOption?: SelectOption;
  onChange: (...event: any[]) => void;
  onBlur: (...event: any[]) => void;
  options?: SelectOption[];
}

export interface ComplexValue {
  selectedOptions?: ComboBoxOption[];
  onChange: (values: ComboBoxOption[]) => void;
  onBlur: (...event: any[]) => void;
  options?: ComboBoxOption[];
  onCreateOption: (
    searchValue: string,
    flattenedOptions: EuiComboBoxOptionOption[]
  ) => void;
}

export interface FormValues {
  properties: MetaProperty[];
}

export const SCHEMA: {
  [key in FIELD_TYPES]: FIELD_FORM;
} = {
  [FIELD_TYPES.TEXT]: {
    icon: MdTextFields,
    label: "Text",
    placeholder: "Property",
    component: (props) => (
      <EuiFieldText autoFocus fullWidth {...(props as PrimitiveValue)} />
    ),
  },
  [FIELD_TYPES.NUMBER]: {
    icon: AiOutlineNumber,
    label: "Number",
    placeholder: "Property",
    component: (props) => (
      <EuiFieldNumber autoFocus fullWidth {...(props as PrimitiveValue)} />
    ),
  },
  [FIELD_TYPES.SELECT]: {
    icon: HiOutlineSelector,
    label: "Select",
    placeholder: "Property",
    component: (props) => {
      const { options, selectedOptions, onCreateOption, onChange, onBlur } =
        props as ComplexValue;
      return (
        <EuiComboBox
          autoFocus
          singleSelection={{ asPlainText: true }}
          fullWidth
          options={options}
          onCreateOption={onCreateOption}
          selectedOptions={selectedOptions}
          onChange={(values) => onChange(values as ComboBoxOption[])}
          onBlur={onBlur}
        />
      );
    },
  },
  [FIELD_TYPES.MULTI_SELECT]: {
    icon: HiOutlineExternalLink,
    label: "Multi-select",
    placeholder: "Property",
    component: (props) => {
      const { options, selectedOptions, onCreateOption, onChange, onBlur } =
        props as ComplexValue;
      return (
        <EuiComboBox
          autoFocus
          fullWidth
          options={options}
          onCreateOption={onCreateOption}
          selectedOptions={selectedOptions}
          onChange={(values) => onChange(values as ComboBoxOption[])}
          onBlur={onBlur}
        />
      );
    },
  },
  [FIELD_TYPES.COMPANY]: {
    icon: MdBusiness,
    label: "Company",
    placeholder: "Property",
    component: (props) => {
      return <CompanyFinder {...(props as ComplexValue)} />;
    },
  },
  [FIELD_TYPES.URL]: {
    icon: SiCurl,
    label: "URL",
    placeholder: "Property",
    component: (props) => (
      <EuiFieldText
        fullWidth
        autoFocus
        {...(props as PrimitiveValue)}
        type="url"
      />
    ),
  },
  [FIELD_TYPES.EMAIL]: {
    icon: MdOutlineMail,
    label: "Email",
    placeholder: "Property",
    component: (props) => (
      <EuiFieldText
        fullWidth
        autoFocus
        {...(props as PrimitiveValue)}
        type="email"
      />
    ),
  },
  [FIELD_TYPES.DATE]: {
    icon: BsCalendar2Date,
    label: "Date",
    placeholder: "Date Done",
    component: (props) => {
      const { value, onChange, onBlur } = props as PrimitiveValue;
      debugger;
      return (
        <EuiDatePicker
          fullWidth={true}
          autoFocus
          selected={moment(value as string)}
          onChange={(date: Moment, e) => {
            onChange(date.toISOString());
          }}
          onClickOutside={onBlur}
          onBlur={onBlur}
        />
      );
    },
  },
};
