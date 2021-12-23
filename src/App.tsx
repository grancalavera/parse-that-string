import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { bind, Subscribe } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import { map } from "rxjs/internal/operators/map";
import { Layout } from "./layout/layout";

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
    <Layout>
      <TextField
        label="Type a number in words..."
        value={words}
        onChange={(e) => setWords(e.target.value)}
      />
      <Typography variant="h6" align="center">
        <Subscribe fallback={"👆 type something!"}>
          <TheNumber />
        </Subscribe>
      </Typography>
    </Layout>
  );
}

const TheNumber = () => {
  const theNumber = useTheNumber();
  return <>{theNumber === undefined ? "..." : isNaN(theNumber) ? "💥" : theNumber}</>;
};
