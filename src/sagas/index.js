import { redgrapeWatchers } from './Redgrape';

export default function* rootWatchers() {
  yield [
    redgrapeWatchers(),
  ];
}
