import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingSpinner,
  EuiPanel,
  EuiText,
  EuiTitle,
} from "@elastic/eui";
import { useEffect, useState } from "react";

export const FullPageLoader = () => {
  const [quote, setQuote] = useState<{
    body: string;
    author: string;
  } | null>();
  useEffect(() => {
    let isFetchCanceled = false;
    async function fetchQuote() {
      const res = await fetch(
        "https://stoicquotesapi.com/v1/api/quotes/random"
      );
      const quote = await res.json();
      if (!isFetchCanceled) {
        setQuote({
          author: quote.author,
          body: quote.body,
        });
      }
    }
    fetchQuote();
    return () => {
      isFetchCanceled = true;
    };
  }, []);

  return (
    <EuiFlexGroup
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "100%" }}
    >
      <EuiFlexItem grow={false}>
        <EuiLoadingSpinner size="xl" style={{ height: 60, width: 60 }} />
      </EuiFlexItem>
      {quote && (
        <>
          <EuiFlexItem
            grow={false}
            style={{ maxWidth: 500, textAlign: "center" }}
          >
            <EuiTitle size="l">
              <h1>{quote.body}</h1>
            </EuiTitle>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiText size="m">--&nbsp;{quote.author}</EuiText>
          </EuiFlexItem>
        </>
      )}
    </EuiFlexGroup>
  );
};
