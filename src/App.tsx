import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { bind, Subscribe } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import { map } from "rxjs/internal/operators/map";
import { CenterLayout } from "./layout/center-layout";
import { FullPageLayout } from "./layout/full-page-layout";

const [words$, setWords] = createSignal<string>();
const [useWords] = bind(words$, "");

const knownNumbers: Record<string, number | undefined> = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
};

const [useTheNumber] = bind(
  words$.pipe(map((word) => (word === "" ? undefined : knownNumbers[word] ?? NaN)))
);

export function App() {
  const words = useWords();

  return (
    <FullPageLayout>
      <CenterLayout>
        <Stack>
          <TextField
            label="Type a number in words..."
            value={words}
            onChange={(e) => setWords(e.target.value)}
          />
          <Typography variant="h1" align="center">
            <Subscribe fallback={"..."}>
              <TheNumber />
            </Subscribe>
          </Typography>
        </Stack>
      </CenterLayout>
    </FullPageLayout>
  );
}
const TheNumber = () => {
  const theNumber = useTheNumber();
  return <>{theNumber === undefined ? "..." : isNaN(theNumber) ? "💥" : theNumber}</>;
};
