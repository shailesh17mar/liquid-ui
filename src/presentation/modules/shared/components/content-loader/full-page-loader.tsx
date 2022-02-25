import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingSpinner,
  EuiPanel,
  EuiText,
} from "@elastic/eui";
import { useEffect, useState } from "react";

export const FullPageLoader = () => {
  const [quote, setQuote] = useState<string | null>();
  useEffect(() => {
    let isFetchCanceled = false;
    async function fetchQuote() {
      const res = await fetch(
        "https://stoicquotesapi.com/v1/api/quotes/random"
      );
      const quote = await res.json();
      if (!isFetchCanceled) {
        setQuote(quote.body);
      }
    }
    fetchQuote();
    return () => {
      isFetchCanceled = true;
    };
  }, []);

  return (
    <EuiPanel
      style={{ height: "100%" }}
      grow
      hasBorder={false}
      hasShadow={false}
    >
      <EuiFlexGroup alignItems="center" justifyContent="spaceAround">
        <EuiFlexItem grow={false}>
          <EuiLoadingSpinner size="xl" />
          {quote && <EuiText color="subdued">{quote}</EuiText>}
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPanel>
  );
};
