// https://rxjs.dev/api/operators/shareReplay
// https://react-rxjs.org/docs/api/core/shareLatest

import { interval } from "rxjs";
import { scan, shareReplay, take } from "rxjs/operators";

const obs$ = interval(1000);
const shared$ = obs$.pipe(take(4), shareReplay());

shared$.subscribe((x) => console.log("sub A: ", x));
shared$.subscribe((x) => console.log("sub B: ", x));

setTimeout(() => {
  console.log("very late to the game...");
  shared$
    .pipe(scan((xs, x) => [...xs, x], [] as number[]))
    .subscribe((x) => console.log("sub C: ", x));
}, 5000);
