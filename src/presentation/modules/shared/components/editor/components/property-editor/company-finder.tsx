import { EuiComboBox, EuiHealth } from "@elastic/eui";
import { useState, useCallback, useEffect } from "react";
import { ComplexValue } from "./meta-field";
import { ComboBoxOption } from "./types";

export const CompanyFinder: React.FC<ComplexValue> = (props) => {
  const { selectedOptions, onChange, onBlur } = props;
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );

  const onSearchChange = useCallback((searchValue) => {
    setLoading(true);
    setOptions([]);

    fetch(
      `https://autocomplete.clearbit.com/v1/companies/suggest?query=${searchValue}`
    )
      .then((results) => results.json())
      .then((companies) => {
        setLoading(false);
        if (Array.isArray(companies)) {
          setOptions(
            companies.map(
              (company: { name: string; domain: string; logo: string }) => {
                return {
                  label: company.name,
                  value: company.domain,
                };
              }
            )
          );
        }
      });
  }, []);

  return (
    <EuiComboBox
      fullWidth
      aria-label="Company"
      placeholder="Search company"
      async
      options={options}
      selectedOptions={selectedOptions}
      isLoading={isLoading}
      singleSelection
      onBlur={onBlur}
      onChange={(values) => onChange(values as ComboBoxOption[])}
      onSearchChange={onSearchChange}
    />
  );
};
