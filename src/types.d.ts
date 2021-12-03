export interface SComponent<P = {}> {
  (props: P): JSX.Element;
  displayName?: string;
}
