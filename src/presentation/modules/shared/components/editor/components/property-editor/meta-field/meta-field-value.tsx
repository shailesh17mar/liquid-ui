import {
  EuiTextColor,
  EuiFlexGroup,
  EuiFlexItem,
  EuiBadge,
} from "@elastic/eui";
import moment from "moment";
import { FIELD_TYPES, MetaProperty } from "../types";

interface MetaFieldValueProps {
  property: MetaProperty;
}
export const MetaFieldValue: React.FC<MetaFieldValueProps> = ({ property }) => {
  const type = property.type;
  const hasValue =
    type === FIELD_TYPES.MULTI_SELECT ||
    type === FIELD_TYPES.COMPANY ||
    type === FIELD_TYPES.SELECT
      ? property.selectedOptions && property.selectedOptions?.length > 0
      : Boolean(property.value);
  const value = hasValue ? property.value : "Empty";
  if (!hasValue) return <EuiTextColor color="subdued">{value}</EuiTextColor>;
  switch (type) {
    case FIELD_TYPES.DATE:
      return (
        <EuiTextColor color="text">
          {moment(value).format("MMMM DD, YYYY")}
        </EuiTextColor>
      );
    case FIELD_TYPES.MULTI_SELECT:
      return (
        <EuiFlexGroup wrap responsive={false} gutterSize="xs">
          {property.selectedOptions?.map((option, index) => (
            <EuiFlexItem key={index} grow={false}>
              <EuiBadge color={option.color}>{option.label}</EuiBadge>
            </EuiFlexItem>
          ))}
        </EuiFlexGroup>
      );
    case FIELD_TYPES.COMPANY:
      const company = property.selectedOptions && property.selectedOptions[0];
      return (
        <EuiFlexGroup gutterSize="xs">
          {company?.value && (
            <EuiFlexItem grow={false}>
              <img
                style={{
                  width: "25px",
                  height: "auto",
                }}
                alt="company-logo"
                src={`https://logo.clearbit.com/${company?.value}`}
              />
            </EuiFlexItem>
          )}
          <EuiFlexItem
            grow={false}
            style={{
              color: "#69707D",
              fontWeight: 400,
            }}
          >
            {company?.label || "Select company"}
          </EuiFlexItem>
        </EuiFlexGroup>
      );
    case FIELD_TYPES.URL:
    case FIELD_TYPES.EMAIL:
      return (
        <EuiTextColor
          style={{
            textDecoration: "underline",
          }}
        >
          {value}
        </EuiTextColor>
      );
    case FIELD_TYPES.SELECT:
      return (
        <>
          {property.selectedOptions?.map((option, index) => (
            <EuiTextColor>{option.label}</EuiTextColor>
          ))}
        </>
      );
    default:
      return <EuiTextColor>{value}</EuiTextColor>;
  }
};
