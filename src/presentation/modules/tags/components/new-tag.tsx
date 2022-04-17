import {
  EuiButton,
  EuiButtonEmpty,
  EuiCode,
  EuiFieldText,
  EuiFormControlLayout,
  EuiPanel,
} from "@elastic/eui";
import { useState } from "react";
import { NewTagField } from "../tags.styles";
interface Props {
  onCreate: (label: string) => void;
}
export const NewTag: React.FC<Props> = ({ onCreate }) => {
  const [tag, setTag] = useState("");

  return (
    <NewTagField
      value={tag}
      placeholder="Add new Tag"
      autoFocus
      append={
        <EuiButtonEmpty
          size="xs"
          color="primary"
          onClick={() => {
            onCreate(tag);
            setTag("");
          }}
        >
          Done
        </EuiButtonEmpty>
      }
      onChange={(e) => setTag(e.target.value)}
    />
  );
};
