import { BloomComponent, component } from "bloom-router";

type FloatingCodeboxProps = {
  code: string;
};

component(
  "floating-codebox",
  async function* (component: BloomComponent & HTMLElement & FloatingCodeboxProps) {
    return (
      <div>
        <pre>
          <code>{component.code}</code>
        </pre>
      </div>
    );
  },
  {
    code: "",
  }
);
