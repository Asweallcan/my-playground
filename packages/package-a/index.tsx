import React, { useState, useEffect, FC } from "react";
import { createRoot } from "react-dom/client";

import packageC from "@kunlun/package-c";
import { b1, b2 } from "@kunlun/package-b";
import { loadSource } from "@kunlun/dx-runtime";

const App: FC = () => {
  const [CustomComponentA, setCustomComponentA] = useState<FC<any>>();

  useEffect(() => {
    b1();
    b2();
    packageC();

    loadSource("CustomComponentA").then((Comp: any) => {
      setCustomComponentA(() => Comp);
    });
  }, []);

  return (
    <div>
      <>
        <h1>this is A App</h1>
        {CustomComponentA ? <CustomComponentA a={1} b={2} /> : null}
      </>
    </div>
  );
};

createRoot(document.getElementById("app")!).render(<App />);
